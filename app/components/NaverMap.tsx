"use client";

import { usePlaceStore } from "@/store/usePlaceStore";
import { Place } from "@/types/place";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import NaverMapScript from "../../components/common/NaverMapScript";
import { apiGetPlaces } from "@/api/places/places";
import PlaceModal from "./PlaceModal";

const DEFAULT_CENTER = {
  lat: 37.5665,
  lng: 126.978,
};

const NaverMap = ({ initialData }: { initialData: Place[] }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const naverMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const activeInfowindowRef = useRef<naver.maps.InfoWindow>(null);

  // 매장 데이터 로드
  const { data, isLoading, isError } = useQuery({
    queryKey: ["placeMap"],
    queryFn: apiGetPlaces,
    initialData: initialData,
  });

  // 지도 로드 상태
  const [isMapReady, setIsMapReady] = useState(false);
  // 매장 정보 모달
  const [isPlaecModal, setIsPlaceModal] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<Place>();

  // 장소 검색 스토어
  const { place } = usePlaceStore();

  // 지도 로드 함수
  const handleReadyMap = () => {
    if (!mapRef.current || !window.naver) return;

    const { naver } = window;

    const center = new naver.maps.LatLng(
      DEFAULT_CENTER.lat,
      DEFAULT_CENTER.lng,
    );

    const map = new naver.maps.Map(mapRef.current, {
      center,
      zoom: 15,
    });

    const markers = initialData?.map((place) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(place.lat, place.lng),
        map,
        title: place.name,
        icon: {
          // url: "/images/marker.png",
          content: `
          <div style="display: flex;flex-direction: column; align-items: center; justify-content: center;">
            <img src="/images/marker.png" alt="마커 이미지" style="width:50px;height:50px;object-fit:contain;" />
            <span style="font-size: 12px;font-weight: 600">${place.name}</span>
          </div>
          `,
          size: new naver.maps.Size(50, 50),
          scaledSize: new naver.maps.Size(50, 50),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 50),
        },
      });

      const infoWindow = new naver.maps.InfoWindow({
        content: `
      <div style="padding:12px;border-radius:5px;box-shadow: 1px 1px 5px 1px #D3DAD9;background-color: #fff;">
        <strong style="display:block;font-size:16px;font-weight:700;color: #0066FF;">
          ${place.name}
        </strong>
        <p style="font-size:10px;color: #999;font-weight:500;">
          ${place ? place.address : "등록된 주소가 없습니다."} ${place && place.address_detail}
        </p>
      </div>
    `,
        borderWidth: 0,
        backgroundColor: "none",
        anchorSize: new naver.maps.Size(5, 5),
      });

      naver.maps.Event.addListener(marker, "click", () => {
        activeInfowindowRef?.current?.close();

        setIsPlaceModal(true);
        setSelectedPlace(place);

        infoWindow.open(map, marker);
        activeInfowindowRef.current = infoWindow;
      });

      return marker;
    });

    naverMapRef.current = map;
    markerRef.current = markers;

    setIsMapReady(true);
  };

  // 주소 검색 함수
  const searchAddress = (query: string) => {
    if (!window.naver?.maps?.Service) return;
    if (!naverMapRef.current) return;
    if (!query.trim()) return;

    const { naver } = window;

    naver.maps.Service.geocode({ query }, (status: any, response: any) => {
      if (status === naver.maps.Service.Status.ERROR) {
        console.error("주소 검색 실패");
        return;
      }

      console.log("status", status);
      console.log("response", response);

      const result = response.v2.addresses[0];

      if (!result) {
        console.log("검색 결과 없음");
        return;
      }

      const lat = Number(result.y);
      const lng = Number(result.x);
      const position = new naver.maps.LatLng(lat, lng);

      naverMapRef.current.setCenter(position);

      console.log("res", position);
    });
  };

  // 검색 기능 활성화
  useEffect(() => {
    if (!isMapReady) return;

    searchAddress(place);
  }, [isMapReady, place]);

  return (
    <>
      <NaverMapScript onReady={handleReadyMap} />
      {isPlaecModal && selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => {
            setIsPlaceModal(false);
            activeInfowindowRef.current?.close();
          }}
        />
      )}
      <div ref={mapRef} className="w-full h-full" />
    </>
  );
};

export default NaverMap;
