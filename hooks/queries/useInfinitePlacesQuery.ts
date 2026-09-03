import { apiGetPlacesInfinite } from "@/api/places/places";
import { apiGetReviewInfinite } from "@/api/reviews/reviews";
import { useInfiniteQuery } from "@tanstack/react-query";

// 매장 정보 - 인피니티 스크롤
export const useInfinitePlacesQuery = () => {
  return useInfiniteQuery({
    queryKey: ["places", "infinite"],
    queryFn: ({ pageParam }) => apiGetPlacesInfinite(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
