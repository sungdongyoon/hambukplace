import { getPlaces } from "@/api/places";
import NaverMap from "@/components/NaverMap";

export default async function Home() {
  const getPlacesData = await getPlaces();

  return (
    <div>
      <NaverMap initialData={getPlacesData} />
    </div>
  );
}
