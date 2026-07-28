import { getPlaces } from "@/api/places";
import NaverMap from "@/components/NaverMap";

export default async function Home() {
  const getPlacesData = await getPlaces();

  return (
    <div className="w-full">
      <NaverMap initialData={getPlacesData} />
    </div>
  );
}
