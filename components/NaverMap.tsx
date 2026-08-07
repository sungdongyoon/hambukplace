"use client";

import { getPlacesMock } from "@/api/places";
import { usePlaceStore } from "@/store/usePlaceStore";
import { Place } from "@/types/place";
import { useQuery } from "@tanstack/react-query";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import NaverMapScript from "./common/NaverMapScript";

const DEFAULT_CENTER = {
  lat: 37.5665,
  lng: 126.978,
};

const NaverMap = ({ initialData }: { initialData: Place[] }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const naverMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // 매장 데이터 로드
  const { data, isLoading, isError } = useQuery({
    queryKey: ["places"],
    queryFn: getPlacesMock,
    initialData: initialData,
  });

  // 지도 로드 상태
  const [isMapReady, setIsMapReady] = useState(false);

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
      return new naver.maps.Marker({
        position: new naver.maps.LatLng(place.lat, place.lng),
        map,
        title: place.name,
      });
    });

    console.log("marakers", markers);

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

      const result = response.v2.addresses[0];

      if (!result) {
        console.log("검색 결과 없음");
        return;
      }

      const lat = Number(result.y);
      const lng = Number(result.x);
      const position = new naver.maps.LatLng(lat, lng);

      naverMapRef.current.setCenter(position);
      // markerRef.current.setPosition(position);
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

      <div ref={mapRef} className="h-screen w-full" />
    </>
  );
};

export default NaverMap;
