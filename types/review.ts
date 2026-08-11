import { ParamValue } from "next/dist/server/request/params";

// 리뷰 타입
export type Review = {
  id: string;
  place_id: string;
  rate: number;
  content: string;
  images: string[];
  visited_at: string;
  created_at: string;
  user_id: string;
};

// 리뷰 추가 타입
export type AddReviewType = {
  place_id: string | ParamValue;
  rate: number;
  visited_at: string;
  content: string;
  images: File[];
};
