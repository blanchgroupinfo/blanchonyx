/**
 * Supabase data client for all entity reads/writes.
 *
 * Import from: "@/api/dataClient"
 */

import { supabase } from "@/integrations/supabase/client";

// ─── Business Listings ────────────────────────────────────────────
export const BusinessListing = {
  list: async (limit = 50) => {
    const { data, error } = await supabase
      .from("business_listings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },
};

// ─── Governance Proposals ─────────────────────────────────────────
export const GovernanceProposal = {
  list: async (limit = 50) => {
    const { data, error } = await supabase
      .from("governance_proposals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },
  filter: async (criteria: Record<string, unknown>, limit = 50) => {
    let query = supabase
      .from("governance_proposals")
      .select("*")
      .order("end_date", { ascending: false })
      .limit(limit);
    if (criteria?.status) query = query.eq("status", criteria.status);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  update: async (id: string, updates: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from("governance_proposals")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// ─── Social Posts ─────────────────────────────────────────────────
export const SocialPost = {
  list: async (limit = 50) => {
    const { data, error } = await supabase
      .from("social_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },
  create: async (post: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from("social_posts")
      .insert([post])
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// ─── Marketplace Items ────────────────────────────────────────────
export const MarketplaceItem = {
  list: async (limit = 50) => {
    const { data, error } = await supabase
      .from("marketplace_items")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },
  filter: async (criteria: Record<string, unknown>, limit = 50) => {
    let query = supabase
      .from("marketplace_items")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (criteria?.featured !== undefined) query = query.eq("featured", criteria.featured);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
};

// ─── Member Applications ─────────────────────────────────────────
export const MemberApplication = {
  create: async (application: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from("member_applications")
      .insert([application])
      .select()
      .single();
    if (error) throw error;
    return { success: true, message: "Application submitted for review", data };
  },
};
