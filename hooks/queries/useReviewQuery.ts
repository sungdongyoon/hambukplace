import { apiGetReview } from "@/api/reviews/reviews";
import { useQuery } from "@tanstack/react-query";

export const useReviewQuery = (placeId: string) => {
  return useQuery({
    queryKey: ["reviews", placeId],
    queryFn: () => apiGetReview(placeId),
  });
};
