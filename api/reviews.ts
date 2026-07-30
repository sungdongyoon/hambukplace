import { Review } from "@/types/review";

export const getReviews = async (): Promise<Review[]> => {
  const response = await fetch(`http://localhost:3000/api/reviews`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("리뷰 정보를 불러오는데 실패했습니다.");
  }

  return response.json();
};
