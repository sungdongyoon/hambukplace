import {
  apiDeletePlace,
  apiCreatePlace,
  apiUpdatePlace,
} from "@/api/places/places";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// [POST] 매장 추가 뮤테이션
export const useCreatePlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiCreatePlace,
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
      queryClient.invalidateQueries({
        queryKey: ["places", variables.placeId],
      });
    },
  });
};

// [DELETE] 매장 정보 삭제 뮤테이션
export const useDeletePlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiDeletePlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
};
