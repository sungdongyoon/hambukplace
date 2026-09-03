import { apiGetReviews } from "@/api/reviews/reviews";
import { useQuery } from "@tanstack/react-query";

// 전체 리뷰 정보
export const useReviewsQuery = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => apiGetReviews(),
  });
};
