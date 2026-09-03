"use client";

import EmptyState from "@/components/common/EmptyState";
import Loading from "@/components/common/Loading";
import { useInfinitePlacesQuery } from "@/hooks/queries/useInfinitePlacesQuery";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const PlaceList = () => {
  // 매장 데이터 호출
  const {
    data: placeData,
    isLoading: placeLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePlacesQuery();

  // 매장 리스트
  const placeList = placeData?.pages.flatMap((el) => el.places);

  // intersection observer 훅
  const { ref, inView } = useInView();

  // 특정 요소가 페이지에 감지되면 next page 리뷰 데이터 호출
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (placeLoading) {
    return (
      <div className="w-full h-50 flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-5 gap-y-10">
        {placeList?.map((place) => (
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
      <div ref={ref} className="flex h-12 items-center justify-center">
        {isFetchingNextPage && <Loading />}
      </div>
    </>
  );
};

export default PlaceList;
