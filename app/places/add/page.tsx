"use client";

import Button from "@/components/common/Button";
import FileInput from "@/components/common/FileInput";
import Input from "@/components/common/Input";
import NaverMapScript from "@/components/common/NaverMapScript";
import PageTitle from "@/components/common/PageTitle";
import { useCreatePlace } from "@/hooks/muataions/usePlacesMutation";
import { useBreakPoint } from "@/hooks/useBreakPoint";
import { AddPlaceType } from "@/types/place";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SearchAddressModal from "./components/SearchAddressModal";
import Link from "next/link";

const PlaceAddPage = () => {
  // 매장 등록 정보
  const [addPlaceInfo, setAddPlaceInfo] = useState<AddPlaceType>({
    name: "",
    address: "",
    address_detail: "",
    lat: null,
    lng: null,
    open_hours: "",
    phone: "",
    images: [],
  });
  // 매장 검색 모달 상태값
  const [isSearchModal, setIsSearchModal] = useState<boolean>(false);

  // router
  const router = useRouter();

  // 모바일 구분
  const isBreakPoint = useBreakPoint("sm");

  // mutation
  const postPlace = useCreatePlace();

  // 주소 검색 함수
  const searchAddress = (query: string) => {
    if (!query.trim()) {
      alert("주소를 입력해주세요.");
      return;
    }

    if (!window.naver?.maps?.Service) {
      console.error("네이버 지도 API가 아직 로드되지 않았습니다.");
      return;
    }

    const { naver } = window;

    naver.maps.Service.geocode({ query }, (status: any, response: any) => {
      if (status === naver.maps.Service.Status.ERROR) {
        console.error("주소 검색 실패");
        return;
      }

      const result = response.v2.addresses[0];

      if (!result) {
        console.log("검색 결과 없음");
        return;
      }

      setAddPlaceInfo((prev) => ({
        ...prev,
        address: result.roadAddress || result.jibunAddress,
        lat: Number(result.y),
        lng: Number(result.x),
      }));
    });
  };

  // 매장 등록 함수
  const handlePostPlace = () => {
    if (!addPlaceInfo.name) {
      alert("매장 이름을 입력해주세요");
      return;
    }
    if (!addPlaceInfo.address) {
      alert("매장 주소를 입력해주세요");
      return;
    }

    if (confirm("매장 정보를 등록하시겠습니까?")) {
      postPlace.mutate(addPlaceInfo, {
        onSuccess: () => {
          alert("매장 정보가 등록되었습니다!");
          router.replace("/places");
        },
        onError: (error) => {
          console.error("매장 정보 추가 실패", error);
          alert("매장 정보 추가 실패!");
        },
      });
    }
  };

  return (
    <section>
      <NaverMapScript />
      <PageTitle>매장 추가</PageTitle>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-10 gap-y-20 mb-20">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="name"
            className="font-semibold text-[0.8rem] xs:text-[1rem]"
          >
            매장 이름
          </label>
          <Input
            id="name"
            value={addPlaceInfo.name}
            placeholder="매장 이름을 입력해주세요"
            className="text-[0.8rem] sm:text-[0.9rem]"
            onChange={(e) =>
              setAddPlaceInfo({ ...addPlaceInfo, name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="address"
            className="font-semibold text-[0.8rem] xs:text-[1rem]"
          >
            주소
          </label>
          {isSearchModal && (
            <SearchAddressModal
              onClose={() => setIsSearchModal(false)}
              searchAddress={searchAddress}
            />
          )}
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="w-full flex flex-col gap-1">
              <Input
                id="address"
                value={addPlaceInfo.address}
                className="text-[0.8rem] sm:text-[0.9rem]"
                readOnly
              />
              {addPlaceInfo.address && (
                <Input
                  id="addressDetail"
                  placeholder="상세 주소를 입력해주세요"
                  value={addPlaceInfo.address_detail}
                  className="text-[0.8rem] sm:text-[0.9rem]"
                  onChange={(e) =>
                    setAddPlaceInfo({
                      ...addPlaceInfo,
                      address_detail: e.target.value,
                    })
                  }
                />
              )}
            </div>
            <Button
              type="button"
              className="shrink-0"
              size="md"
              onClick={() => setIsSearchModal(true)}
            >
              주소 검색
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-[0.8rem] xs:text-[1rem]">영업시간</p>
          <Input
            value={addPlaceInfo.open_hours}
            placeholder="영업시간을 입력해주세요"
            className="text-[0.8rem] sm:text-[0.9rem]"
            onChange={(e) =>
              setAddPlaceInfo({ ...addPlaceInfo, open_hours: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="phone"
            className="font-semibold text-[0.8rem] xs:text-[1rem]"
          >
            전화번호
          </label>
          <Input
            id="phone"
            value={addPlaceInfo.phone}
            placeholder="매장 전화번호를 입력해주세요"
            inputMode="numeric"
            maxLength={11}
            className="text-[0.8rem] sm:text-[0.9rem]"
            onChange={(e) =>
              setAddPlaceInfo({
                ...addPlaceInfo,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-[0.8rem] xs:text-[1rem]">
            이미지 추가
          </p>
          <FileInput
            id="image"
            label="이미지 업로드"
            className="text-[0.7rem] sm:text-[0.8rem]"
            onFilesChange={(e) =>
              setAddPlaceInfo((prev) => ({
                ...prev,
                images: e,
              }))
            }
          />
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <Link href="/places">
          <Button
            className="w-25"
            size={`${isBreakPoint ? "sm" : "lg"}`}
            variant="outline"
          >
            뒤로가기
          </Button>
        </Link>
        <Button
          className="w-25"
          size={`${isBreakPoint ? "sm" : "lg"}`}
          onClick={handlePostPlace}
        >
          저장
        </Button>
      </div>
    </section>
  );
};

export default PlaceAddPage;
