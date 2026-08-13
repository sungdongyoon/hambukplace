import { createClient } from "@/lib/supabase/client";
import { AddPlaceType, Place } from "@/types/place";
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

  // 이미지 파일 storage로 별도 전송
  const files = place.images ?? [];
  const imageUrls: string[] = [];

  for (const file of files) {
    const filePath = `places/${crypto.randomUUID()}-${file.name.split(".").pop() || "jpg"}`;

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

  const payload = {
    ...place,
    images: imageUrls,
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
  place: AddPlaceType;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("places")
    .update(place)
    .eq("id", id);

  if (error) {
    console.log("매장 업데이트 실패!", error);
    throw new Error(error.message);
  }
};
