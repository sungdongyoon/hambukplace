"use client";

import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

const AuthInitializer = () => {
  const { setUser, setIsAuthLoading } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();

    const initAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setIsAuthLoading(false);
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setIsAuthLoading]);

  return null;
};

export default AuthInitializer;
