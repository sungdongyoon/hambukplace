export type Place = {
  id: string;
  name: string;
  address: string;
  road_address: string | null;
  lat: number;
  lng: number;
  phone: string | null;
  open_hours: string | null;
  images: string[];
  created_at: string;
  created_by: string;
};
