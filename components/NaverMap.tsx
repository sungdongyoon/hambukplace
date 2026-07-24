"use client";

import Script from "next/script";
import { useRef } from "react";

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleReady = () => {
    if (!mapRef.current || !window.naver) return;

    const { naver } = window;

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.5665, 126.978),
      zoom: 15,
    });

    new naver.maps.Marker({
      position: new naver.maps.LatLng(37.5665, 126.978),
      map,
    });
  };

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        strategy="afterInteractive"
        onReady={handleReady}
      />

      <div ref={mapRef} className="h-screen w-full" />
    </>
  );
};

export default NaverMap;
