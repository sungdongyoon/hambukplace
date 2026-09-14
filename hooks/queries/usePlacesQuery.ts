import { apiGetPlaces } from "@/api/places/places";
import { Place, PlaceSortType } from "@/types/place";
import { useQuery } from "@tanstack/react-query";

// 전체 매장 정보
export const usePlacesQuery = (sort: PlaceSortType = "latest") => {
  return useQuery({
    queryKey: ["places", { sort }],
    queryFn: () => apiGetPlaces(sort),
  });
};
