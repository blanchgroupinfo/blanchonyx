import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

type AppUser = SupabaseUser & {
  full_name?: string;
  role?: string;
};

type AuthErrorState = {
  type: string;
  message: string;
} | null;

type AuthContextValue = {
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  authChecked: boolean;
  authError: AuthErrorState;
  checkUserAuth: () => Promise<AppUser | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function normalizeUser(user: SupabaseUser | null): AppUser | null {
  if (!user) return null;

  return {
    ...user,
    full_name:
      typeof user.user_metadata?.full_name === "string"
        ? user.user_metadata.full_name
        : user.email,
    role:
      typeof user.app_metadata?.role === "string"
        ? user.app_metadata.role
        : typeof user.user_metadata?.role === "string"
          ? user.user_metadata.role
          : "member",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState<AuthErrorState>(null);

  const checkUserAuth = useCallback(async () => {
    setIsLoadingAuth(true);
    setAuthError(null);

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      const hasSession = error.message !== "Auth session missing!";
      if (hasSession) {
        setAuthError({ type: "auth_error", message: error.message });
      }
      setUser(null);
      setAuthChecked(true);
      setIsLoadingAuth(false);
      return null;
    }

    const nextUser = normalizeUser(data.user);
    setUser(nextUser);
    setAuthChecked(true);
    setIsLoadingAuth(false);
    return nextUser;
  }, []);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;

      if (error) {
        setAuthError({ type: "auth_error", message: error.message });
        setUser(null);
      } else {
        setUser(normalizeUser(data.session?.user ?? null));
        setAuthError(null);
      }

      setAuthChecked(true);
      setIsLoadingAuth(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(normalizeUser(session?.user ?? null));
      setAuthError(null);
      setAuthChecked(true);
      setIsLoadingAuth(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoadingAuth,
      authChecked,
      authError,
      checkUserAuth,
    }),
    [authChecked, authError, checkUserAuth, isLoadingAuth, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
