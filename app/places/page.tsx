import React from "react";

const PlacesPage = () => {
  return (
    <div className="border">
      <h1>매장 목록 페이지</h1>
      <div className="grid grid-cols-12 gap-3">
        {Array.from({ length: 20 }).map((_, index) => (
          <div className="col-span-3" key={index}>
            <div className="bg-black w-full aspect-2/1"></div>
            <p>원스타 올드패션드 햄버거 도곡점</p>
            <address>서울특별시 강남구 도곡동 424-11 1층</address>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesPage;
