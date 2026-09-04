import { apiLogin } from "@/api/auth/login";
import { apiSignup } from "@/api/auth/signup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// [POST] 로그인 뮤테이션
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });
};
