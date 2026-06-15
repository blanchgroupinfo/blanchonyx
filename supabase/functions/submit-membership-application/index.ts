// Submit a membership application and send a confirmation email to the applicant.
// CORS-enabled, no auth required for submission.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Payload {
  fullName: string;
  email: string;
  country: string;
  lineage?: string;
  tier?: "sardonyx" | "onyx" | "royal";
  intent: string;
}

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = (await req.json()) as Payload;
    const { fullName, email, country, lineage, tier, intent } = body ?? {};

    if (!fullName || !email || !country || !intent) {
      return new Response(JSON.stringify({ error: "Missing required fields." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await supabase
      .from("membership_applications")
      .insert({
        full_name: fullName.slice(0, 200),
        email: email.toLowerCase().slice(0, 254),
        country: country.slice(0, 120),
        lineage: lineage?.slice(0, 120) ?? null,
        tier: tier ?? "onyx",
        intent: intent.slice(0, 4000),
      })
      .select()
      .single();

    if (error) throw error;

    // Send a confirmation email (best-effort — does not block success response).
    let emailQueued = false;
    try {
      const html = `
        <div style="font-family:Georgia,serif;background:#0b0b0c;color:#f5e9c8;padding:32px;border-radius:12px;max-width:600px;margin:auto">
          <h1 style="color:#c9a24b;margin-top:0">Blessings upon you, ${escape(fullName)}</h1>
          <p>Your application to <strong>Blanch Onyx</strong> — the Royal Priesthood Social Club — has been received in honor.</p>
          <p style="border-left:3px solid #c9a24b;padding-left:14px;color:#e8d9a8"><em>"But ye are a chosen generation, a royal priesthood, an holy nation…"</em><br/>— 1 Peter 2:9</p>
          <p>The Council of the Royal House will review your sacred intent. You will be contacted as your application advances through review.</p>
          <p style="font-size:13px;color:#9a8a5c">Tier requested: <strong>${escape(tier ?? "onyx")}</strong></p>
          <p style="font-size:12px;color:#7a6a4c;margin-top:32px">Blanch Group — a Sovereign Trust</p>
        </div>`;

      const { error: emailErr } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "membership-confirmation",
          recipientEmail: email,
          idempotencyKey: `membership-${data.id}`,
          templateData: { name: fullName, tier: tier ?? "onyx" },
          // Fallback raw HTML if template not yet registered.
          fallbackSubject: "Your Blanch Onyx application has been received",
          fallbackHtml: html,
        },
      });
      emailQueued = !emailErr;
    } catch (_e) {
      // Email infrastructure may not be configured yet — application is still safely stored.
      emailQueued = false;
    }

    return new Response(JSON.stringify({ ok: true, id: data.id, emailQueued }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-membership-application error", err);
    return new Response(JSON.stringify({ error: "Unable to submit application." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
