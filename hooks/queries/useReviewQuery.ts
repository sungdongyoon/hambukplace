import { apiGetReview } from "@/api/reviews/reviews";
import { useQuery } from "@tanstack/react-query";

// 특정 매장 리뷰 정보
export const useReviewQuery = (placeId: string) => {
  return useQuery({
    queryKey: ["reviews", placeId],
    queryFn: () => apiGetReview(placeId),
  });
};
