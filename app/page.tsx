import { getPlacesMock } from "@/api/places";
import { apiGetPlacesData } from "@/api/places/place";

import NaverMap from "@/components/NaverMap";

export default async function Home() {
  const getPlacesData = await getPlacesMock();

  const getPlacesData2 = await apiGetPlacesData();

  return (
    <div className="w-full">
      <NaverMap initialData={getPlacesData2} />
    </div>
  );
}
