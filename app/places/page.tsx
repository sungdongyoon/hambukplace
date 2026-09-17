import PageTitle from "@/components/common/PageTitle";
import PlaceList from "./components/PlaceList";
import PlaceListControl from "./components/PlaceListControl";
import { apiGetPlacesInfinite } from "@/api/places/places";

const PlacesPage = async () => {
  const initialData = await apiGetPlacesInfinite({
    pageParam: 0,
    sort: "latest",
  });

  return (
    <section>
      <div className="flex justify-between items-center">
        <PageTitle>매장 목록</PageTitle>
        <PlaceListControl />
      </div>
      <PlaceList initialData={{ page: initialData, sort: "latest" }} />
    </section>
  );
};

export default PlacesPage;
