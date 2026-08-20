"use client";

import { useReviewQuery } from "@/hooks/queries/useReviewQuery";
import { Place } from "@/types/place";

const PlaceModal = ({ place }: { place: Place }) => {
  const { data, isLoading } = useReviewQuery(place.id);

  console.log("review", data);
  console.log("place", place);

  return (
    <div className="w-100 h-[80%] fixed left-10 top-30 z-10 bg-white shadow-2xl rounded-lg p-3">
      <h3>{place?.name}</h3>
      <address>
        {place?.address} {place?.address_detail}
      </address>
      <div>
        <p>영업시간</p>
        <span>{place?.open_hours}</span>
      </div>
      <div>
        <p>전화번호</p>
        <span>{place?.phone}</span>
      </div>
      <div>
        <p>리뷰</p>
        {data?.map((el) => (
          <p key={el.id}>{el.content}</p>
        ))}
      </div>
    </div>
  );
};

export default PlaceModal;
