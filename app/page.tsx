import { apiGetPlaces } from "@/api/places/places";

import NaverMap from "@/components/NaverMap";

export default async function Home() {
  const getPlacesData = await apiGetPlaces();

  return (
    <div className="w-full">
      <NaverMap initialData={getPlacesData} />
    </div>
  );
}
