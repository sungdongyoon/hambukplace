import { apiGetPlacesInfinite } from "@/api/places/places";
import { PlaceSortType } from "@/types/place";
import { useInfiniteQuery } from "@tanstack/react-query";

// 매장 정보 - 인피니티 스크롤
export const useInfinitePlacesQuery = (sort?: PlaceSortType) => {
  return useInfiniteQuery({
    queryKey: ["places", "infinite", { sort }],
    queryFn: ({ pageParam }) => apiGetPlacesInfinite({ pageParam, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
