"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PlaceSearchInput from "./PlaceSearchInput";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogout } from "@/hooks/muataions/useLogoutMutation";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  // 로그인 상태
  const { user, isAuthLoading } = useAuthStore();

  // 햄버거 메뉴 상태
  const [isHamburger, setIsHamburger] = useState<boolean>(false);

  // 로그아웃 뮤테이션
  const logoutMutation = useLogout();

  // 로그아웃 함수
  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      logoutMutation.mutate(undefined, {
        onSuccess: () => {
          alert("로그아웃 되었습니다");
          router.replace("/");
        },
        onError: (error) => {
          console.log("로그아웃 실패", error);
          alert("로그아웃 실패");
        },
      });
    }
  };

  useEffect(() => {
    setIsHamburger(false);
  }, [pathname]);

  return (
    <header className="w-full h-20 flex bg-background-normal-normal border-b border-line-normal-normal px-10 sm:px-20">
      {/* <ViewBreakPoint className="top-10" /> */}
      <div className="w-full flex items-center justify-between gap-10">
        <div className="max-w-125 w-full flex items-center gap-10 flex-1 min-w-0">
          <Link href="/" className="inline-flex shrink-0">
            <Image
              alt="Hambukplace"
              src="/images/hambukplace-logo.png"
              width={120}
              height={32}
              className="h-5 w-auto"
            />
          </Link>
          <div className="hidden xs:block w-full">
            <PlaceSearchInput />
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
          {user && (
            <>
              <li>
                <Link href="/places/add">매장 추가</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  로그아웃
                </button>
              </li>
            </>
          )}
          {/* <li>
            <Link href="/">리뷰 목록</Link>
          </li> */}
        </ul>
      </div>
    </header>
  );
};

export default Header;
