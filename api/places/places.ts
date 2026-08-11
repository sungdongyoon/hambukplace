import { createClient } from "@/lib/supabase/client";
import { AddPlaceType, Place } from "@/types/place";

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

  // await supabase.from("places").insert(place);

  const { data, error } = await supabase.from("places").insert(place);

  if (error) {
    console.log("매장 추가 실패!", error);
    throw new Error(error.message);
  }
};
