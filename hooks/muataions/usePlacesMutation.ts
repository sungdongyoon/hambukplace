import { createPlace } from "@/api/places/place";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// [POST] 매장 추가 뮤테이션
export const usePostPlaces = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
};
