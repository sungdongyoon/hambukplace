import { getReviews } from "@/api/reviews";
import React from "react";
import { FaStar } from "react-icons/fa6";

const TabReview = async () => {
  // 리뷰 데이터
  const reviewsData = await getReviews();

  return (
    <div className="flex flex-col gap-3">
      {reviewsData.map((review) => (
        <div className="flex items-center gap-5" key={review.id}>
          <div className="bg-neutral-90 aspect-3/2 w-35 shrink-0"></div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-[0.7rem] font-semibold">
              <FaStar className="text-yellow-400" />
              {review.rate}
            </p>
            <p className="text-label-strong text-[0.8rem]">{review.content}</p>
            <p className="text-label-assistive text-[0.6rem] font-semibold">
              {review.visited_at} 방문
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabReview;
