export const dynamic = "force-dynamic";

import { apiGetPlaces } from "@/api/places/places";

import NaverMap from "@/app/components/NaverMap";
import PlaceSearchInput from "@/components/common/PlaceSearchInput";

export default async function Home() {
  const getPlacesData = await apiGetPlaces();

  return (
    <div className="w-full relative">
      <div className="w-[80%] block xs:hidden absolute left-1/2 top-5 -translate-x-1/2 z-10">
        <PlaceSearchInput />
      </div>
      <NaverMap initialData={getPlacesData} />
    </div>
  );
}
