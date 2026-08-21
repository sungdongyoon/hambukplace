"use client";

import Button from "@/components/common/Button";
import FileInput from "@/components/common/FileInput";
import Input from "@/components/common/Input";
import NaverMapScript from "@/components/common/NaverMapScript";
import PageTitle from "@/components/common/PageTitle";
import {
  usePostPlace,
  useUpdatePlace,
} from "@/hooks/muataions/usePlacesMutation";
import { useMobile } from "@/hooks/useMobile";
import { UpdateImage, UpdatePlaceType } from "@/types/place";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchAddressModal from "../../add/components/SearchAddressModal";
import { usePlacesQuery } from "@/hooks/queries/usePlacesQuery";
import Loading from "@/components/common/Loading";

const PlaceUpdatePage = () => {
  // 매장 등록 정보
  const [updatePlaceInfo, setUpdatePlaceInfo] = useState<UpdatePlaceType>({
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

  // params
  const params = useParams<{ placeId: string }>();
  const placeId = params.placeId;

  // router
  const router = useRouter();

  // 모바일 구분
  const isMobile = useMobile();

  // tanstack query
  const { data, isLoading } = usePlacesQuery();
  const updatePlace = useUpdatePlace();

  // 매장 상세 정보
  const placeData = data?.find((el) => el.id === placeId);

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

      setUpdatePlaceInfo((prev) => ({
        ...prev,
        address: result.roadAddress || result.jibunAddress,
        lat: Number(result.y),
        lng: Number(result.x),
      }));
    });
  };

  // 매장 업데이트 함수
  const handleUpdatePlace = () => {
    updatePlace.mutate(
      { id: placeId, place: updatePlaceInfo },
      {
        onSuccess: () => {
          alert("매장 정보가 업데이트 되었습니다!");
          router.replace("/places");
        },
        onError: (error) => {
          console.error("매장 정보 업데이트 실패", error);
          alert("매장 정보 업데이트 실패!");
        },
      },
    );
  };

  // 초기 화면에 매장 정보 적용
  useEffect(() => {
    const initImages: UpdateImage[] =
      placeData?.images.map((el) => ({
        id: el,
        type: "exist",
        url: el,
      })) ?? [];

    setUpdatePlaceInfo({
      name: placeData?.name ?? "",
      address: placeData?.address ?? "",
      address_detail: placeData?.address_detail,
      lat: placeData?.lat ?? null,
      lng: placeData?.lng ?? null,
      open_hours: placeData?.open_hours ?? "",
      phone: placeData?.phone ?? "",
      images: initImages,
    });
  }, [placeData]);

  return (
    <section>
      {isLoading ? (
        <div className="w-full h-150 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <PageTitle>매장 정보 수정</PageTitle>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-10 gap-y-20 mb-20">
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="font-semibold">
                매장 이름
              </label>
              <Input
                id="name"
                value={updatePlaceInfo.name}
                placeholder="매장 이름을 입력해주세요"
                onChange={(e) =>
                  setUpdatePlaceInfo({
                    ...updatePlaceInfo,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="address" className="font-semibold">
                주소
              </label>
              {isSearchModal && (
                <SearchAddressModal
                  onClose={() => setIsSearchModal(false)}
                  searchAddress={searchAddress}
                />
              )}
              <div className="flex gap-3">
                <div className="w-full flex flex-col gap-1">
                  <Input
                    id="address"
                    value={updatePlaceInfo.address}
                    readOnly
                  />
                  {updatePlaceInfo.address && (
                    <Input
                      id="addressDetail"
                      placeholder="상세 주소를 입력해주세요"
                      value={updatePlaceInfo.address_detail}
                      onChange={(e) =>
                        setUpdatePlaceInfo({
                          ...updatePlaceInfo,
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
              <p className="font-semibold">영업시간</p>
              <Input
                value={updatePlaceInfo.open_hours}
                placeholder="영업시간을 입력해주세요"
                onChange={(e) =>
                  setUpdatePlaceInfo({
                    ...updatePlaceInfo,
                    open_hours: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="phone" className="font-semibold">
                전화번호
              </label>
              <Input
                id="phone"
                value={updatePlaceInfo.phone}
                placeholder="매장 전화번호를 입력해주세요"
                inputMode="numeric"
                maxLength={11}
                onChange={(e) =>
                  setUpdatePlaceInfo({
                    ...updatePlaceInfo,
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
                existImages={placeData?.images}
                onPreviewsChange={(previews) =>
                  setUpdatePlaceInfo((prev) => ({
                    ...prev,
                    images: previews.map((preview) =>
                      preview.file
                        ? {
                            id: preview.id,
                            type: "new" as const,
                            file: [preview.file],
                          }
                        : {
                            id: preview.id,
                            type: "exist" as const,
                            url: preview.url,
                          },
                    ),
                  }))
                }
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button className="w-25" size="lg" variant="outline">
              뒤로가기
            </Button>
            <Button className="w-25" size="lg" onClick={handleUpdatePlace}>
              저장
            </Button>
          </div>
        </>
      )}
      <NaverMapScript />
    </section>
  );
};

export default PlaceUpdatePage;
