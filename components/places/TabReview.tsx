import { getReviews } from "@/api/reviews";
import React from "react";

const TabReview = async () => {
  // 리뷰 데이터
  const reviewsData = await getReviews();

  return (
    <div className="flex flex-col gap-3">
      {reviewsData.map((review) => (
        <div className="flex items-center gap-5" key={review.id}>
          <div className="bg-neutral-90 aspect-3/2 w-35 shrink-0"></div>
          <div className="flex flex-col gasp-2">
            <p>{review.rate}</p>
            <p>{review.content}</p>
            <p>{review.visited_at}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabReview;
