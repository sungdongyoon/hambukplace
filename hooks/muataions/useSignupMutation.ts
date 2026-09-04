import { apiSignup } from "@/api/signup/signup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// [POST] 회원가입 뮤테이션
export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiSignup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signup"] });
    },
  });
};
