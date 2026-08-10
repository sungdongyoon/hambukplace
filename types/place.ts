// 매장 정보 타입
export type Place = {
  id: string;
  name: string;
  address: string;
  address_detail?: string;
  road_address: string | null;
  lat: number;
  lng: number;
  phone: string | null;
  open_hours: string | null;
  images: string[];
  created_at: string;
  created_by: string;
};

// 매장 추가 타입
export type AddPlaceType = {
  name: string;
  address: string;
  address_detail?: string;
  lat: number | null;
  lng: number | null;
  open_hours?: string;
  phone?: string;
  images?: File[];
};
