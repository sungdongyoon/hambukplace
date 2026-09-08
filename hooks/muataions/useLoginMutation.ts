import { apiLogin } from "@/api/auth/login";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";

// 로그인 뮤테이션
export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};
