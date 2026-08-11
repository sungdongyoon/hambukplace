import { apiGetReview } from "@/api/reviews/reviews";
import { useQuery } from "@tanstack/react-query";

export const useReviewQuery = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => apiGetReview(),
  });
};
