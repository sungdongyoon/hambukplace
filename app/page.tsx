import { getPlacesMock } from "@/api/places";
import { apiGetPlacesData } from "@/api/places/place";

import NaverMap from "@/components/NaverMap";

export default async function Home() {
  const getPlacesData = await getPlacesMock();

  const getPlacesData2 = await apiGetPlacesData();
  console.log("데이터", getPlacesData2);

  return (
    <div className="w-full">
      <NaverMap initialData={getPlacesData} />
    </div>
  );
}
