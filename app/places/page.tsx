export const dynamic = "force-dynamic";

import { apiGetPlaces } from "@/api/places/places";
import EmptyState from "@/components/common/EmptyState";
import PageTitle from "@/components/common/PageTitle";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PlacesPage = async () => {
  const placesData = await apiGetPlaces();

  return (
    <section>
      <PageTitle>매장 목록</PageTitle>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-5 gap-y-10">
        {placesData.map((place) => (
          <article key={place.id}>
            <Link href={`/places/${place.id}`}>
              <div className="w-full relative aspect-3/2 rounded-lg mb-3">
                {place?.images?.length ? (
                  <Image
                    alt="매장 이미지"
                    src={place.images[0]}
                    fill
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <EmptyState message="등록된 이미지가 없습니다" />
                )}
              </div>
              <p className="font-semibold">{place.name}</p>
              <address className="text-[0.7rem] not-italic text-label-alternative">
                {`${place.address} ${place.address_detail}`}
              </address>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PlacesPage;
