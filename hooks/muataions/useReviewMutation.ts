import { apiPostPlace } from "@/api/places/places";
import { apiPostReview } from "@/api/reviews/reviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// [POST] 리뷰 추가 뮤테이션
export const usePostReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiPostReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};
