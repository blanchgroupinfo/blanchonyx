import { supabase } from "@/integrations/supabase/client";

const getStoreValue = <T>(key: string, initial: T): T => {
  if (typeof window === "undefined") return initial;
  const stored = window.localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initial;
    }
  }
  return initial;
};

const setStoreValue = <T>(key: string, val: T): void => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(val));
  }
};

export const GovernanceProposal = {
  list: async (limit?: number) => {
    try {
      const { data, error } = await supabase
        .from("governance_proposals")
        .select("*")
        .limit(limit || 10);
      if (!error && data && data.length > 0) {
        return data.map(item => ({
          ...item,
          votes_for: item.votes_for ?? item.votes_yes ?? 0,
          votes_against: item.votes_against ?? item.votes_no ?? 0,
          votes_abstain: item.votes_abstain ?? 0
        }));
      }
    } catch (e) {
      console.warn("Supabase governance fetch failed, returning mock:", e);
    }

    return getStoreValue("mock_proposals", [
      {
        id: "1",
        title: "Acquisition of Agricultural Land in Covenant Territories",
        description: "Proposal to acquire sovereign land for non-GMO farming and food safety.",
        status: "active",
        category: "governance",
        end_date: "2026-11-20",
        votes_for: 154,
        votes_against: 2,
        votes_abstain: 0,
      },
      {
        id: "2",
        title: "Establishment of the DLT Sovereign Settlement Gateway",
        description: "Enable localized payment clearance nodes on our distributed ledger.",
        status: "active",
        category: "technology",
        end_date: "2026-12-15",
        votes_for: 210,
        votes_against: 0,
        votes_abstain: 1,
      }
    ]).slice(0, limit);
  },

  update: async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from("governance_proposals")
        .update(updates)
        .eq("id", id);
      if (!error) return { success: true };
    } catch (e) {
      console.warn("Supabase governance update failed:", e);
    }

    const list = await GovernanceProposal.list();
    const updated = list.map((item: any) => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    });
    setStoreValue("mock_proposals", updated);
    return { success: true };
  }
};

export const SocialPost = {
  list: async (limit?: number) => {
    try {
      const { data, error } = await supabase
        .from("social_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit || 10);
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn("Supabase social post fetch failed:", e);
    }

    return getStoreValue("mock_posts", [
      {
        id: "1",
        author: "Praise Most High AHAYAH",
        content: "Faith, unity, and divine purpose guide our social union. Together we prosper.",
        created_at: new Date().toISOString()
      },
      {
        id: "2",
        author: "Admin Council",
        content: "BLANCH ONYX is now fully upgraded with standalone serverless capabilities.",
        created_at: new Date(Date.now() - 3600000).toISOString()
      }
    ]).slice(0, limit);
  },

  create: async (data: any) => {
    try {
      const { data: inserted, error } = await supabase
        .from("social_posts")
        .insert([data])
        .select()
        .single();
      if (!error && inserted) return inserted;
    } catch (e) {
      console.warn("Supabase social post create failed:", e);
    }

    const list = await SocialPost.list();
    const nextId = (list.length + 1).toString();
    const newPost = {
      id: nextId,
      author: data.author || "Sovereign Member",
      content: data.content,
      created_at: new Date().toISOString()
    };
    const updated = [newPost, ...list];
    setStoreValue("mock_posts", updated);
    return newPost;
  }
};

export const MarketplaceItem = {
  list: async (limit?: number) => {
    try {
      const { data, error } = await supabase
        .from("marketplace_items")
        .select("*")
        .limit(limit || 10);
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn("Supabase marketplace fetch failed:", e);
    }

    return getStoreValue("mock_marketplace_items", [
      {
        id: "1",
        title: "Prestige Sovereign Coin (Commemorative)",
        price: "500 BOX",
        description: "Elite 24k gold-plated token of physical membership.",
        featured: true
      },
      {
        id: "2",
        title: "Black Card Access Gateway Pass",
        price: "1,500 BOX",
        description: "Digital pass giving access to members-only lounges and physical structures.",
        featured: true
      }
    ]).slice(0, limit);
  },

  filter: async (criteria: any, limit?: number) => {
    try {
      let query = supabase.from("marketplace_items").select("*");
      if (criteria?.featured) {
        query = query.eq("featured", true);
      }
      const { data, error } = await query.limit(limit || 10);
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn("Supabase marketplace filter failed:", e);
    }

    const list = await MarketplaceItem.list();
    if (criteria?.featured) {
      return list.filter((item: any) => item.featured === true).slice(0, limit);
    }
    return list.slice(0, limit);
  }
};
