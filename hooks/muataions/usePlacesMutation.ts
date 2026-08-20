import { apiPostPlace, apiUpdatePlace } from "@/api/places/places";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// [POST] 매장 추가 뮤테이션
export const usePostPlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiPostPlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
};

// [UPDATE] 매장 업데이트 뮤테이션
export const useUpdatePlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiUpdatePlace,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["updatePlace"] });
      queryClient.invalidateQueries({ queryKey: ["places", variables.id] });
    },
  });
};
