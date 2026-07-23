import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-full h-20 flex bg-background-normal-normal border-b border-line-normal-normal px-10">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image alt="로고 이미지" width={100} height={100} src="/next.svg" />
          <input placeholder="매장, 주소 검색" aria-label="매장, 주소 검색" />
        </div>
        <ul className="flex items-center gap-3">
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
      </div>
    </header>
  );
};

export default Header;
