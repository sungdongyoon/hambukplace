import type { Place } from "@/types/place";

export const getPlacesMock = async (): Promise<Place[]> => {
  const response = await fetch(`http://localhost:3000/api/places`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("매장 정보를 불러오는데 실패했습니다.");
  }

  return response.json();
};
