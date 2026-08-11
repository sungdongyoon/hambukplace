import { apiPostPlace } from "@/api/places/places";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// [POST] 매장 추가 뮤테이션
export const usePostPlaces = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiPostPlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
};
