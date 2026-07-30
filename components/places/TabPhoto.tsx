import Image from "next/image";
import React from "react";

const TabPhoto = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-5 gap-y-10">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          className="relative aspect-5/4 w-full overflow-hidden rounded-lg"
          key={index}
        >
          <Image
            src="/life.jpg"
            alt="매장 이미지"
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default TabPhoto;
