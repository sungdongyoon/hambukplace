import { apiGetPlace } from "@/api/places/places";
import { useQuery } from "@tanstack/react-query";

// 특정 매장 정보
export const usePlaceQuery = (placeId: string) => {
  return useQuery({
    queryKey: ["places", placeId],
    queryFn: () => apiGetPlace(placeId),
  });
};
