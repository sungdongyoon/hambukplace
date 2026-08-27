"use client";

import Image from "next/image";
import Link from "next/link";
import Input from "./Input";
import { useBreakPoint } from "@/hooks/useBreakPoint";
import { usePlaceStore } from "@/store/usePlaceStore";
import { usePlacesQuery } from "@/hooks/queries/usePlacesQuery";
import Loading from "./Loading";
import ViewBreakPoint from "./ViewBreakPoint";
import { FaBars } from "react-icons/fa6";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  // 햄버거 메뉴 상태
  const [isHamburger, setIsHamburger] = useState<boolean>(false);

  // 주소 스토어
  const {
    placeName,
    selectedPlaceId,
    setPlaceName,
    setSelectedPlaceId,
    resetPlace,
  } = usePlaceStore();

  // 매장 리스트 데이터
  const { data: placesData, isLoading } = usePlacesQuery();

  const pathname = usePathname();

  // 검색어 필터
  const filteredPlaces = placeName.trim()
    ? placesData?.filter((el) => el.name.includes(placeName))
    : [];

  useEffect(() => {
    setIsHamburger(false);
  }, [pathname]);

  return (
    <header className="w-full h-20 flex bg-background-normal-normal border-b border-line-normal-normal px-10 sm:px-20">
      <ViewBreakPoint className="top-10" />
      <div className="w-full flex items-center justify-between gap-10">
        <div className="max-w-125 w-full flex items-center gap-10 flex-1 min-w-0">
          <Image
            alt="로고 이미지"
            width={100}
            height={100}
            src="/next.svg"
            className="shrink-0"
          />
          <div className="hidden xs:block min-w-0 max-w-125 flex-1 relative">
            <Input
              placeholder="매장, 주소 검색"
              aria-label="매장, 주소 검색"
              value={placeName}
              onChange={(e) => {
                setPlaceName(e.target.value);
                setSelectedPlaceId(null);
              }}
            />
            {placeName && filteredPlaces?.length !== 0 && (
              <div className="w-full absolute z-10 bg-white border border-line-normal-neutral rounded-sm">
                {isLoading ? (
                  <div className="w-full h-30 flex justify-center items-center">
                    <Loading />
                  </div>
                ) : (
                  <ul className="w-full flex flex-col">
                    {filteredPlaces?.map((el) => (
                      <li
                        key={el.id}
                        className="border-b border-line-normal-neutral px-4 py-2 font-medium text-[0.8rem] cursor-pointer hover:bg-background-elevated-alternative last:border-0 "
                        onClick={() => {
                          setPlaceName(el.name);
                          setSelectedPlaceId(el.id);
                        }}
                      >
                        {el.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <button
            type="button"
            className="inline-flex sm:hidden text-[1.4rem]"
            onClick={() => setIsHamburger(!isHamburger)}
          >
            <FaBars />
          </button>
          {isHamburger && (
            <Dropdown
              list={[
                {
                  label: "지도",
                  href: "/",
                },
                {
                  label: "매장 목록",
                  href: "/places",
                },
                {
                  label: "매장 추가",
                  href: "/places/add",
                },
              ]}
            />
          )}
        </div>
        <ul className="hidden sm:flex items-center gap-5 md:gap-15 text-[0.9rem] md:text-[1rem] text-label-neutral font-semibold shrink-0">
          <li>
            <Link href="/">지도</Link>
          </li>
          <li>
            <Link href="/places">매장 목록</Link>
          </li>
          <li>
            <Link href="/places/add">매장 추가</Link>
          </li>
          {/* <li>
            <Link href="/">리뷰 목록</Link>
          </li> */}
        </ul>
      </div>
    </header>
  );
};

export default Header;
