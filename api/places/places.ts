import { uploadPlaceImages } from "@/utils/image";
import { createClient } from "@/lib/supabase/client";
import { AddPlaceType, Place, UpdatePlaceType } from "@/types/place";
import { ParamValue } from "next/dist/server/request/params";

// [GET] 매장 정보
export const apiGetPlaces = async (): Promise<Place[]> => {
  const supabase = await createClient();

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

// [POST] 매장 추가
export const apiPostPlace = async (place: AddPlaceType) => {
  const supabase = createClient();

  // 이미지 storage로 전송
  const uploadUrls = await uploadPlaceImages(place.images);

  // 최종 post 값
  const payload = {
    ...place,
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
  id,
  place,
}: {
  id: string | ParamValue;
  place: UpdatePlaceType;
}) => {
  const supabase = createClient();

  // 기존, 새로운 이미지 구분
  const existImages =
    place.images
      ?.filter((image) => image.type === "exist")
      .map((image) => image.url) ?? [];
  const newImages =
    place.images
      ?.filter((image) => image.type === "new")
      .flatMap((image) => image.file) ?? [];

  // new 이미지 storage로 전송
  const uploadUrls = (await uploadPlaceImages(newImages)) ?? [];

  // 최종 전송 이미지
  const nextImages = [...existImages, ...uploadUrls];

  // 최종 전송 값
  const payload = {
    ...place,
    images: nextImages,
  };

  const { data, error } = await supabase
    .from("places")
    .update(payload)
    .eq("id", id);

  if (error) {
    console.log("매장 업데이트 실패!", error);
    throw new Error(error.message);
  }
};
