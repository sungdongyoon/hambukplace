"use client";

import Button from "@/components/common/Button";
import FileInput from "@/components/common/FileInput";
import Input from "@/components/common/Input";
import NaverMapScript from "@/components/common/NaverMapScript";
import PageTitle from "@/components/common/PageTitle";
import { usePostPlaces } from "@/hooks/muataions/usePlacesMutation";
import { useMobile } from "@/hooks/useMobile";
import { AddPlaceType } from "@/types/place";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PlaceAddPage = () => {
  // 매장 등록 정보
  const [addPlaceInfo, setAddPlaceInfo] = useState<AddPlaceType>({
    name: "",
    address: "",
    lat: null,
    lng: null,
    open_hours: "",
    phone: "",
    images: [],
  });
  // 주소 쿼리 상태값
  const [addressQuery, setAddressQuery] = useState<string>("");

  // router
  const router = useRouter();

  // 모바일 구분
  const isMobile = useMobile();

  // mutation
  const postPlace = usePostPlaces();

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
  };

  // console.log("addPlaceInfo", addPlaceInfo);

  return (
    <section>
      <NaverMapScript />
      <PageTitle>매장 추가</PageTitle>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-10 gap-y-20 mb-20">
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className="font-semibold">
            매장 이름
          </label>
          <Input
            id="name"
            value={addPlaceInfo.name}
            placeholder="매장 이름을 입력해주세요"
            onChange={(e) =>
              setAddPlaceInfo({ ...addPlaceInfo, name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="address" className="font-semibold">
            주소
          </label>
          <Input
            id="address"
            value={addressQuery}
            placeholder="매장 주소를 입력해주세요"
            onChange={(e) => setAddressQuery(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              type="button"
              className="inline"
              size="lg"
              onClick={() => searchAddress(addressQuery)}
            >
              검색
            </Button>
          </div>
          {addPlaceInfo.address && (
            <p className="text-sm text-label-alternative">
              선택된 주소: {addPlaceInfo.address}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">영업시간</p>
          <Input
            value={addPlaceInfo.open_hours}
            placeholder="영업시간을 입력해주세요"
            onChange={(e) =>
              setAddPlaceInfo({ ...addPlaceInfo, open_hours: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="phone" className="font-semibold">
            전화번호
          </label>
          <Input
            id="phone"
            value={addPlaceInfo.phone}
            placeholder="매장 전화번호를 입력해주세요"
            inputMode="numeric"
            maxLength={11}
            onChange={(e) =>
              setAddPlaceInfo({
                ...addPlaceInfo,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">이미지 추가</p>
          <FileInput
            id="image"
            label="이미지 업로드"
            onChange={(e) => setAddPlaceInfo({ ...addPlaceInfo, images: e })}
          />
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <Button className="w-25" size="lg" variant="outline">
          뒤로가기
        </Button>
        <Button className="w-25" size="lg" onClick={handlePostPlace}>
          저장
        </Button>
      </div>
    </section>
  );
};

export default PlaceAddPage;
