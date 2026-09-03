import { apiGetReviewInfinite } from "@/api/reviews/reviews";
import { useInfiniteQuery } from "@tanstack/react-query";

// 특정 매장 리뷰 정보 - 인피니티 스크롤
export const useInfiniteReviewQuery = (placeId: string) => {
  return useInfiniteQuery({
    queryKey: ["reviews", placeId, "infinite"],
    queryFn: ({ pageParam }) =>
      apiGetReviewInfinite({
        placeId,
        pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: Boolean(placeId),
  });
};
