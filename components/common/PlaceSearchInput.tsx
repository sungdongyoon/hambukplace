"use client";

import Input from "./Input";
import { usePlaceStore } from "@/store/usePlaceStore";
import Loading from "./Loading";
import { usePlacesQuery } from "@/hooks/queries/usePlacesQuery";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter } from "next/navigation";
import { Place } from "@/types/place";

const PlaceSearchInput = ({ className }: { className?: string }) => {
  const { data: placesData, isLoading } = usePlacesQuery();
  const { placeName, setPlaceName, setSelectedPlaceId } = usePlaceStore();

  const pathname = usePathname();
  const router = useRouter();

  // 검색어 필터
  const filteredPlaces = placeName.trim()
    ? placesData?.filter((el) => el.name.includes(placeName))
    : [];

  // 매장 리스트 클릭 함수
  const handleClickList = (place: Place) => {
    if (pathname === "/") {
      setPlaceName(place.name);
      setSelectedPlaceId(place.id);
    } else {
      router.push(`/places/${place.id}`);
      setPlaceName("");
    }
  };

  return (
    <div className={twMerge(`min-w-0 max-w-125 flex-1 relative ${className}`)}>
      <Input
        placeholder="매장 이름을 검색해주세요"
        aria-label="매장 이름을 검색해주세요"
        value={placeName}
        className="bg-static-white rounded-4xl p-3"
        onChange={(e) => {
          setPlaceName(e.target.value);
          setSelectedPlaceId(null);
        }}
      />
      {placeName && filteredPlaces?.length !== 0 && (
        <div className="w-full absolute z-10 bg-white border border-line-normal-neutral rounded-sm">
          {isLoading ? (
            <div className="w-full h-30 flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <ul className="w-full flex flex-col">
              {filteredPlaces?.map((el) => (
                <li
                  key={el.id}
                  className="border-b border-line-normal-neutral px-4 py-2 font-medium text-[0.8rem] cursor-pointer hover:bg-background-elevated-alternative last:border-0 "
                  onClick={() => handleClickList(el)}
                >
                  {el.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaceSearchInput;
