import { uploadPlaceImages } from "@/utils/image";
import { createClient } from "@/lib/supabase/client";
import { AddPlaceType, Place, UpdatePlaceType } from "@/types/place";

const PAGE_SIZE = 5;

// [GET] 매장 정보
export const apiGetPlaces = async (): Promise<Place[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("places")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("매장 정보 불러오기 실패", error);
    throw new Error(error.message);
  }

  return data ?? [];
};

// [GET] 매장 정보 - 인피니티 스크롤
export const apiGetPlacesInfinite = async (pageParam: number) => {
  const supabase = createClient();

  const from = pageParam * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("places")
    .select("*")
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("매장 정보 불러오기 실패", error);
    throw new Error(error.message);
  }

  return {
    places: data,
    nextPage: (data?.length ?? 0) === PAGE_SIZE ? pageParam + 1 : undefined,
  };
};

// [GET] 특정 매장 정보
export const apiGetPlace = async (placeId: string): Promise<Place> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("places")
    .select("*")
    .eq("id", placeId)
    .single();

  if (error) {
    console.log("매장 정보 불러오기 실패", error);
    throw new Error(error.message);
  }

  return data;
};

// [POST] 매장 추가
export const apiCreatePlace = async (placeData: AddPlaceType) => {
  const supabase = createClient();

  // 이미지 storage로 전송
  const uploadUrls = await uploadPlaceImages(placeData.images);

  // 최종 post 값
  const payload = {
    ...placeData,
    images: uploadUrls,
  };

  const { data, error } = await supabase.from("places").insert(payload);

  if (error) {
    console.log("매장 추가 실패!", error);
    throw new Error(error.message);
  }
};

// [UPDATE] 매장 정보 업데이트
export const apiUpdatePlace = async ({
  placeId,
  placeData,
}: {
  placeId: string;
  placeData: UpdatePlaceType;
}) => {
  const supabase = createClient();

  // 기존, 새로운 이미지 구분
  const existImages =
    placeData.images
      ?.filter((image) => image.type === "exist")
      .map((image) => image.url) ?? [];
  const newImages =
    placeData.images
      ?.filter((image) => image.type === "new")
      .flatMap((image) => image.file) ?? [];

  // new 이미지 storage로 전송
  const uploadUrls = (await uploadPlaceImages(newImages)) ?? [];

  // 최종 전송 이미지
  const nextImages = [...existImages, ...uploadUrls];

  // 최종 전송 값
  const payload = {
    ...placeData,
    images: nextImages,
  };

  const { data, error } = await supabase
    .from("places")
    .update(payload)
    .eq("id", placeId);

  if (error) {
    console.log("매장 업데이트 실패!", error);
    throw new Error(error.message);
  }
};

// [DELETE] 매장 정보 삭제
export const apiDeletePlace = async (placeId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("places")
    .delete()
    .eq("id", placeId);

  if (error) {
    console.log("매장 정보 삭제 실패!", error);
    throw new Error(error.message);
  }
};
