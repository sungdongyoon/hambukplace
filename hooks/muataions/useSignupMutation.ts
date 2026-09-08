import { apiSignup } from "@/api/signup/signup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 회원가입 뮤테이션
export const useSignup = () => {
  return useMutation({
    mutationFn: apiSignup,
  });
};
