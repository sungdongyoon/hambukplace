import { createClient } from "@/lib/supabase/client";
import { SignupType } from "@/types/auth";

// [POST] 회원가입
export const apiSignup = async (signupData: SignupType) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email: signupData.email,
    password: signupData.password,
    options: {
      data: {
        name: signupData.name,
      },
    },
  });

  if (error) {
    console.log("회원가입 실패!", error);
    throw new Error(error.message);
  }
  return data;
};
