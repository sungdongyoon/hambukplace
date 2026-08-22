import { apiGetPlace, apiGetPlaces } from "@/api/places/places";
import { useQuery } from "@tanstack/react-query";

export const usePlaceQuery = (placeId: string) => {
  return useQuery({
    queryKey: ["places", placeId],
    queryFn: () => apiGetPlace(placeId),
  });
};
