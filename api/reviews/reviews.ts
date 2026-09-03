import { uploadPlaceImages } from "@/utils/image";
import { createClient } from "@/lib/supabase/client";
import { AddReviewType, Review } from "@/types/review";

const PAGE_SIZE = 10;

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

// [GET] 특정 매장 리뷰 정보 - 인피니티 스크롤
export const apiGetReviewInfinite = async ({
  placeId,
  pageParam,
}: {
  placeId: string;
  pageParam: number;
}) => {
  const supabase = await createClient();

  const from = pageParam * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("place_id", placeId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.log("리뷰 정보 불러오기 실패", error);
    throw new Error(error.message);
  }

  return {
    reviews: data ?? [],
    nextPage: (data?.length ?? 0) === PAGE_SIZE ? pageParam + 1 : undefined,
  };
};

// [POST] 리뷰 추가
export const apiCreateReview = async (reviewData: AddReviewType) => {
  const supabase = createClient();

  // 이미지 storage로 전송
  const uploadUrls = await uploadPlaceImages(reviewData.images);

  // 최종 post 값
  const payload = {
    ...reviewData,
    images: uploadUrls,
  };

  const { data, error } = await supabase.from("reviews").insert(payload);

  if (error) {
    console.log("리뷰 등록 실패", error);
    throw new Error(error.message);
  }
};
