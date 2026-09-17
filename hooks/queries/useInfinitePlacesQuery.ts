import { apiGetPlacesInfinite } from "@/api/places/places";
import { Place, PlaceSortType } from "@/types/place";
import { useInfiniteQuery } from "@tanstack/react-query";

type PlacesPageData = Awaited<ReturnType<typeof apiGetPlacesInfinite>>;

export type InitialPlacesData = {
  page: PlacesPageData;
  sort: PlaceSortType;
};

// 매장 정보 - 인피니티 스크롤
export const useInfinitePlacesQuery = (
  sort?: PlaceSortType,
  initial?: InitialPlacesData,
) => {
  return useInfiniteQuery({
    queryKey: ["places", "infinite", { sort }],
    queryFn: ({ pageParam }) => apiGetPlacesInfinite({ pageParam, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialData:
      initial && initial.sort === sort
        ? { pages: [initial.page], pageParams: [0] }
        : undefined,
    staleTime: 60_000,
  });
};
