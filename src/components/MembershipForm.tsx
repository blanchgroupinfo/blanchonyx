import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Send, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const MembershipForm = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // Local-only queue until Lovable Cloud is enabled.
    const queue = JSON.parse(localStorage.getItem("blanch_membership_queue") || "[]");
    queue.push({ ...data, submittedAt: new Date().toISOString() });
    localStorage.setItem("blanch_membership_queue", JSON.stringify(queue));
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      toast({
        title: "Application received",
        description: "Your application is queued locally. Backend storage and confirmation emails activate when Lovable Cloud is enabled.",
      });
    }, 700);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-sacred rounded-2xl p-10 text-center"
      >
        <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="font-display text-2xl text-gradient-gold mb-2">
          Application Received in Honor
        </h3>
        <p className="text-white">
          The Council of the Royal House will review your application. Blessings upon you and your house.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-sacred rounded-2xl p-6 md:p-10 space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <Crown className="w-6 h-6 text-primary" />
        <h3 className="font-display text-2xl text-gradient-gold">Membership Application</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" required placeholder="Given & family name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@domain.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country / Region</Label>
          <Input id="country" name="country" required placeholder="Nation of residence" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lineage">Lineage / Tribal Affinity</Label>
          <Input id="lineage" name="lineage" placeholder="Judah, Levi, Benjamin, ..." />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tier">Membership Tier of Interest</Label>
        <select
          id="tier"
          name="tier"
          className="w-full h-10 rounded-md bg-input border border-border px-3 text-foreground"
          defaultValue="onyx"
        >
          <option value="sardonyx">Sardonyx · Initiate</option>
          <option value="onyx">Onyx · Council</option>
          <option value="royal">Royal · Throne</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="intent">Sacred Intent</Label>
        <Textarea
          id="intent"
          name="intent"
          rows={5}
          required
          placeholder="Share your calling, gifts, and how you wish to serve the Royal Priesthood."
        />
      </div>

      <div className="flex items-start gap-3 text-xs text-muted-foreground">
        <ShieldCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <p>
          Your submission is held in confidence. Secure cloud storage, admin review, and confirmation emails
          activate once Lovable Cloud is enabled.
        </p>
      </div>

      <Button type="submit" disabled={submitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        <Send className="w-4 h-4 mr-2" />
        {submitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
};

export default MembershipForm;
