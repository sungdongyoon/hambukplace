import { createClient } from "@/lib/supabase/server";
import { Place } from "@/types/place";

export const apiGetPlacesData = async (): Promise<Place[]> => {
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
