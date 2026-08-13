import { apiGetPlaces } from "@/api/places/places";
import { useQuery } from "@tanstack/react-query";

export const usePlacesQuery = () => {
  return useQuery({
    queryKey: ["postPlace"],
    queryFn: () => apiGetPlaces(),
  });
};
