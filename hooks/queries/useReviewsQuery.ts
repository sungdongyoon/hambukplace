import { apiGetReviews } from "@/api/reviews/reviews";
import { useQuery } from "@tanstack/react-query";

export const useReviewsQuery = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => apiGetReviews(),
  });
};
