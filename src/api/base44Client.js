// Self-contained mock client replacing the external base44 SDK dependency
// Features reactive mock state stored in localStorage for full persistence

const getStoreValue = (key, initial) => {
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

const setStoreValue = (key, val) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(val));
  }
};

export const base44 = {
  auth: {
    me: async () => {
      return getStoreValue("mock_user", {
        id: "usr_blanch_001",
        email: "blanchgroupinfo@gmail.com",
        name: "Blanch Member",
        role: "Member",
        tier: "Onyx Council",
      });
    },
    logout: (redirectUrl) => {
      console.log("Mock Logout triggered");
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("mock_user");
        if (redirectUrl) window.location.href = redirectUrl;
      }
    },
    redirectToLogin: (redirectUrl) => {
      console.log("Mock Redirect to login");
      if (typeof window !== "undefined" && redirectUrl) {
        window.location.href = "/login";
      }
    },
    loginViaEmailPassword: async (email, password) => {
      const mockUser = {
        id: "usr_blanch_001",
        email: email || "blanchgroupinfo@gmail.com",
        name: "Blanch Member",
        role: "Member",
        tier: "Onyx Council",
      };
      setStoreValue("mock_user", mockUser);
      return { access_token: "mock_jwt_token_123" };
    },
    register: async ({ email, password }) => {
      return { status: "success", message: "OTP sent to your email" };
    },
    verifyOtp: async ({ email, otpCode }) => {
      return { access_token: "mock_jwt_token_123" };
    },
    resendOtp: async (email) => {
      return { status: "success" };
    },
    loginWithProvider: (provider, redirect) => {
      console.log(`Mocking login with provider: ${provider}`);
      if (typeof window !== "undefined" && redirect) {
        window.location.href = redirect;
      }
    },
    resetPasswordRequest: async (email) => {
      return { status: "success" };
    },
    resetPassword: async ({ resetToken, newPassword }) => {
      return { status: "success" };
    },
    setToken: (token) => {
      console.log("Mock set token called", token);
    }
  },
  entities: {
    BusinessListing: {
      list: async (order, limit) => {
        return getStoreValue("mock_businesses", [
          {
            id: "1",
            title: "Blanch Sovereign Trust",
            category: "Finance",
            description: "Divine asset management and sovereign wealth solutions.",
            contact: "sovereign@blanch.group"
          },
          {
            id: "2",
            title: "Onyx Aerospace Advisory",
            category: "Transportation",
            description: "Premium flight and private logistics networks.",
            contact: "aero@blanch.group"
          }
        ]);
      }
    },
    GovernanceProposal: {
      list: async (order, limit) => {
        return getStoreValue("mock_proposals", [
          {
            id: "1",
            title: "Acquisition of Agricultural Land in Covenant Territories",
            description: "Proposal to acquire sovereign land for non-GMO farming and food safety.",
            status: "active",
            end_date: "2026-11-20",
            votes_yes: 154,
            votes_no: 2
          },
          {
            id: "2",
            title: "Establishment of the DLT Sovereign Settlement Gateway",
            description: "Enable localized payment clearance nodes on our distributed ledger.",
            status: "active",
            end_date: "2026-12-15",
            votes_yes: 210,
            votes_no: 0
          }
        ]);
      },
      filter: async (criteria, order, limit) => {
        const list = await base44.entities.GovernanceProposal.list();
        if (criteria?.status) {
          return list.filter(item => item.status === criteria.status);
        }
        return list;
      },
      update: async (id, updates) => {
        const list = await base44.entities.GovernanceProposal.list();
        const updated = list.map(item => {
          if (item.id === id) {
            return { ...item, ...updates };
          }
          return item;
        });
        setStoreValue("mock_proposals", updated);
        return { success: true };
      }
    },
    SocialPost: {
      list: async (order, limit) => {
        return getStoreValue("mock_posts", [
          {
            id: "1",
            author: "Praise Most High AHAYAH",
            content: "Faith, unity, and divine purpose guide our social union. Together we prosper.",
            created_date: new Date().toISOString()
          },
          {
            id: "2",
            author: "Admin Council",
            content: "BLANCH ONYX is now fully upgraded with standalone serverless capabilities.",
            created_date: new Date(Date.now() - 3600000).toISOString()
          }
        ]);
      },
      create: async (data) => {
        const list = await base44.entities.SocialPost.list();
        const nextId = (list.length + 1).toString();
        const newPost = {
          id: nextId,
          author: data.author || "Sovereign Member",
          content: data.content,
          created_date: new Date().toISOString()
        };
        const updated = [newPost, ...list];
        setStoreValue("mock_posts", updated);
        return newPost;
      }
    },
    MarketplaceItem: {
      list: async (order, limit) => {
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
        ]);
      },
      filter: async (criteria, order, limit) => {
        const list = await base44.entities.MarketplaceItem.list();
        if (criteria?.featured) {
          return list.filter(item => item.featured === true);
        }
        return list;
      }
    },
    MemberApplication: {
      create: async (form) => {
        console.log("Mock application saved locally:", form);
        return { success: true, message: "Application submitted for review" };
      }
    }
  }
};
