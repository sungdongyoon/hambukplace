import { createClient } from "@/lib/supabase/client";
import {
  AddPlaceType,
  Place,
  UpdateImage,
  UpdatePlaceType,
} from "@/types/place";
import { ParamValue } from "next/dist/server/request/params";

// 이미지 storage 전송 함수
const uploadPlaceImages = async (images: any) => {
  const supabase = await createClient();

  const files = images ?? [];
  const imageUrls: string[] = [];

  for (const file of files) {
    const filePath = `places/${crypto.randomUUID()}-.${file.name.split(".").pop() || "jpg"}`;

    const { error: uploadError } = await supabase.storage
      .from("place-images")
      .update(filePath, file);

    if (uploadError) {
      console.log("이미지 업로드 실패!", uploadError);
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("place-images")
      .getPublicUrl(filePath);

    imageUrls.push(data.publicUrl);
  }

  return imageUrls;
};

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
