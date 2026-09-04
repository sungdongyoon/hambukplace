import { createClient } from "@/lib/supabase/client";
import { LoginType } from "@/types/auth";

// [POST] 로그인
export const apiLogin = async (loginData: LoginType) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  });

  if (error) {
    console.log("로그인 실패!", error);
    throw new Error(error.message);
  }

  return data;
};
