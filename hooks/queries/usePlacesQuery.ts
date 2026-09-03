import { apiGetPlaces } from "@/api/places/places";
import { useQuery } from "@tanstack/react-query";

// 전체 매장 정보
export const usePlacesQuery = () => {
  return useQuery({
    queryKey: ["places"],
    queryFn: () => apiGetPlaces(),
  });
};
