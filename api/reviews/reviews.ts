import { createClient } from "@/lib/supabase/client";
import { Place } from "@/types/place";
import { AddReviewType, Review } from "@/types/review";

// [GET] 리뷰 정보
export const apiGetReview = async (): Promise<Review[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("리뷰 정보 불러오기 실패", error);
    throw new Error(error.message);
  }

  return data ?? [];
};

// [POST] 리뷰 추가
export const apiPostReview = async (review: AddReviewType) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("reviews").insert(review);

  if (error) {
    console.log("리뷰 등록 실패", error);
    throw new Error(error.message);
  }
};
