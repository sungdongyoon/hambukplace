import { getPlaces } from "@/api/places";
import PageTitle from "@/components/common/PageTitle";
import Image from "next/image";
import React from "react";

const PlacePage = async ({ params }: { params: { placeId: string } }) => {
  const { placeId } = await params;

  // 매장 리스트 데이터
  const placesData = await getPlaces();
  const place = placesData.find((el) => el.id === placeId);

  console.log("get", place);
  return (
    <section>
      <PageTitle>{place?.name}</PageTitle>
      <div className="bg-neutral-90 w-full h-87.5"></div>
      <div className="flex flex-col gap-3">
        <address className="not-italic">{place?.address}</address>
        <p>{place?.open_hours ?? "정보 없음"}</p>
        <p>{place?.phone}</p>
      </div>
      <div>
        <div className="border flex gap-3 items-center">
          <button>리뷰</button>
          <button>사진</button>
        </div>
        <div>
          <div className="flex items-center gap-5">
            <div className="bg-neutral-90 aspect-3/2 w-35 shrink-0"></div>
            <div className="flex flex-col gasp-2">
              <p>4.5</p>
              <p>
                치즈버거를 먹었다. 패티는 육즙이 풍부하고 짭짤하며, 두께도
                두꺼운 편이었다. 녹진한 치즈가 적당하게 녹아있었으며 패티와의
                조합이 매우 훌륭했다. 치즈와 패티맛이 강렬하지만 과하게
                부담스럽지는 않은 치즈버거이다.
              </p>
              <p>2026.07.18 방문</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacePage;
