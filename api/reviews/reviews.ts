import { uploadPlaceImages } from "@/utils/image";
import { createClient } from "@/lib/supabase/client";
import { AddReviewType, Review } from "@/types/review";

// [GET] 리뷰 정보
export const apiGetReviews = async (): Promise<Review[]> => {
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

// [GET] 특정 매장 리뷰 정보
export const apiGetReview = async (placeId: string): Promise<Review[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("place_id", placeId)
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

  // 이미지 storage로 전송
  const uploadUrls = await uploadPlaceImages(review.images);

  // 최종 post 값
  const payload = {
    ...review,
    images: uploadUrls,
  };

  const { data, error } = await supabase.from("reviews").insert(payload);

  if (error) {
    console.log("리뷰 등록 실패", error);
    throw new Error(error.message);
  }
};
