import Script from "next/script";

type NaverMapScriptProps = {
  onReady?: () => void;
};

const NaverMapScript = ({ onReady }: NaverMapScriptProps) => {
  return (
    <Script
      id="naver-map-script"
      src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
      strategy="afterInteractive"
      onReady={onReady}
      onError={() => {
        console.error("네이버 지도 API 로드 실패");
      }}
    />
  );
};

export default NaverMapScript;
