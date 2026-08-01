"use client";

import Button from "@/components/common/Button";
import FileInput from "@/components/common/FileInput";
import Input from "@/components/common/Input";
import NaverMapScript from "@/components/common/NaverMapScript";
import PageTitle from "@/components/common/PageTitle";
import React, { useState } from "react";

type AddPlaceType = {
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
  openHour: string;
  phone: string;
  image: File[];
};

const PlaceAddPage = () => {
  // 매장 등록 정보
  const [addPlaceInfo, setAddPlaceInfo] = useState<AddPlaceType>({
    name: "",
    address: "",
    lat: null,
    lng: null,
    openHour: "",
    phone: "",
    image: [],
  });
  // 주소 쿼리 상태값
  const [addressQuery, setAddressQuery] = useState<string>("");

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

  return (
    <section>
      <NaverMapScript />
      <PageTitle>매장 추가</PageTitle>
      <div className="grid grid-cols-2 gap-x-10 gap-y-20 mb-20">
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
          <Button type="button" onClick={() => searchAddress(addressQuery)}>
            검색
          </Button>
          {addPlaceInfo.address && (
            <p className="text-sm text-label-alternative">
              선택된 주소: {addPlaceInfo.address}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">영업시간</p>
          <Input
            value={addPlaceInfo.openHour}
            placeholder="영업시간을 입력해주세요"
            onChange={(e) =>
              setAddPlaceInfo({ ...addPlaceInfo, openHour: e.target.value })
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
            onChange={(e) => setAddPlaceInfo({ ...addPlaceInfo, image: e })}
          />
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <Button className="w-25" size="lg" variant="outline">
          뒤로가기
        </Button>
        <Button className="w-25" size="lg">
          저장
        </Button>
      </div>
    </section>
  );
};

export default PlaceAddPage;
