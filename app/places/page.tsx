import { getPlaces } from "@/api/places";
import PageTitle from "@/components/common/PageTitle";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PlacesPage = async () => {
  const getPlacesData = await getPlaces();

  return (
    <section>
      <PageTitle>매장 목록</PageTitle>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-5 gap-y-10">
        {getPlacesData.map((place) => (
          <article key={place.id}>
            <Link href={`/places/${place.id}`}>
              <div className="w-full relative aspect-3/2 rounded-lg mb-3 border border-line-normal-neutral">
                {/* <Image alt="매장 이미지" src={place.images[0]} fill /> */}
              </div>
              <p className="font-semibold">{place.name}</p>
              <address className="text-[0.7rem] not-italic text-label-alternative">
                {place.address}
              </address>
            </Link>
          </article>
        ))}
        {/* {Array.from({ length: 20 }).map((_, index) => (
          <div key={index}>
            <div className="bg-gray-300 w-full aspect-3/2 rounded-lg mb-3"></div>
            <p className="font-semibold">원스타 올드패션드 햄버거 도곡점</p>
            <address className="text-[0.7rem] not-italic text-label-alternative">
              서울특별시 강남구 도곡동 424-11 1층
            </address>
          </div>
        ))} */}
      </div>
    </section>
  );
};

export default PlacesPage;
