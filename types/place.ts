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

// 매장 업데이트 이미지 타입
export type UpdateImage =
  | {
      id: string;
      type: "exist";
      url: string;
    }
  | {
      id: string;
      type: "new";
      file: File[];
    };

// 매장 업데이트 타입
export type UpdatePlaceType = {
  name: string;
  address: string;
  address_detail?: string;
  lat: number | null;
  lng: number | null;
  open_hours?: string;
  phone?: string;
  images?: UpdateImage[];
};
