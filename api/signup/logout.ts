import { createClient } from "@/lib/supabase/client";

// 로그아웃
export const apiLogout = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("로그아웃 실패", error);
    throw new Error(error.message);
  }
};
