import { apiLogout } from "@/api/auth/logout";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";

// 로그아웃 뮤테이션
export const useLogout = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      setUser(null);
    },
  });
};
