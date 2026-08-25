"use client";

import Image from "next/image";
import Link from "next/link";
import Input from "./Input";
import { useBreakPoint } from "@/hooks/useBreakPoint";
import { usePlaceStore } from "@/store/usePlaceStore";

const Header = () => {
  // 주소 스토어
  const { place, setPlace, resetPlace } = usePlaceStore();

  // 모바일 구분 훅
  const isMobile = useBreakPoint("sm");

  return (
    <header className="w-full h-20 flex bg-background-normal-normal border-b border-line-normal-normal px-20">
      <div className="w-full flex items-center justify-between">
        <div className="max-w-125 w-full flex items-center gap-10 flex-1 min-w-0">
          <Image
            alt="로고 이미지"
            width={100}
            height={100}
            src="/next.svg"
            className="shrink-0"
          />
          <div className="min-w-0 max-w-125 flex-1">
            <Input
              placeholder="매장, 주소 검색"
              aria-label="매장, 주소 검색"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
        </div>
        {isMobile ? null : (
          <ul className="flex items-center gap-15 text-label-neutral font-semibold shrink-0">
            <li>
              <Link href="/">지도</Link>
            </li>
            <li>
              <Link href="/places">매장 목록</Link>
            </li>
            <li>
              <Link href="/places/add">매장 추가</Link>
            </li>
            <li>
              <Link href="/">리뷰 목록</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
