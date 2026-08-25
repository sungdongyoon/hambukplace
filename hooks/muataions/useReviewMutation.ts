import { apiCreateReview } from "@/api/reviews/reviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// [POST] 리뷰 추가 뮤테이션
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiCreateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};
