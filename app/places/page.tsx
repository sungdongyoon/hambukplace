import PageTitle from "@/components/common/PageTitle";
import PlaceList from "./components/PlaceList";
import PlaceListControl from "./components/PlaceListControl";

const PlacesPage = () => {
  return (
    <section>
      <div className="flex justify-between items-center">
        <PageTitle>매장 목록</PageTitle>
        <PlaceListControl />
      </div>
      <PlaceList />
    </section>
  );
};

export default PlacesPage;
