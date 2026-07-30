import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("http://localhost:3000/reviews.json");

  if (!response.ok) {
    return NextResponse.json(
      { message: "리뷰 정보를 불러오는데 실패했습니다." },
      { status: 500 },
    );
  }

  const places = await response.json();

  return NextResponse.json(places);
}
