"use client";

import { usePlaceStore } from "@/store/usePlaceStore";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const DEFAULT_CENTER = {
  lat: 37.5665,
  lng: 126.978,
};

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const naverMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

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

    const marker = new naver.maps.Marker({
      position: center,
      map,
    });

    naverMapRef.current = map;
    markerRef.current = marker;

    setIsMapReady(true);
  };

  const searchAddress = (query: string) => {
    if (!window.naver?.maps?.Service) return;
    if (!naverMapRef.current || !markerRef.current) return;
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
      markerRef.current.setPosition(position);
    });
  };

  useEffect(() => {
    if (!isMapReady) return;

    searchAddress(place);
  }, [isMapReady, place]);

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        strategy="afterInteractive"
        onReady={handleReadyMap}
      />

      <div ref={mapRef} className="h-screen w-full" />
    </>
  );
};

export default NaverMap;
