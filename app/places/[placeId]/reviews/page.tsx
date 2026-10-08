"use client";

import { useReviewQuery } from "@/hooks/queries/useReviewQuery";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const ReviewsPage = () => {
  const params = useParams<{ placeId: string }>();
  // 리뷰 데이터
  const { data: reviewData } = useReviewQuery(params.placeId);
  const reviews = reviewData?.map((review) => review.content) ?? [];

  const summaryMutation = useMutation({
    mutationFn: async (reviews: string[]): Promise<{ summary: string }> => {
      const response = await fetch("/api/reviews/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message ?? "요약 요청 실패");
      return data;
    },
  });
  return (
    <div>
      <h1>매장 리뷰 페이지</h1>
      <h3>매장 리뷰 요약 테스트</h3>
      <button
        type="button"
        disabled={!reviews.length || summaryMutation.isPending}
        onClick={() => summaryMutation.mutate(reviews)}
      >
        {summaryMutation.isPending ? "요약 중..." : "리뷰 요약"}
      </button>
      {summaryMutation.isError && (
        <p role="alert">{summaryMutation.error.message}</p>
      )}
      {summaryMutation.data && <p>{summaryMutation.data.summary}</p>}
    </div>
  );
};

export default ReviewsPage;
