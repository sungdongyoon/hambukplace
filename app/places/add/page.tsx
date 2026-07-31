"use client";

import Button from "@/components/common/Button";
import FileInput from "@/components/common/FileInput";
import Input from "@/components/common/Input";
import PageTitle from "@/components/common/PageTitle";
import React, { useState } from "react";

type AddPlaceType = {
  name: string;
  address: string;
  openHour: string;
  phone: string;
  image: File[];
};

const PlaceAddPage = () => {
  const [addPlaceInfo, setAddPlaceInfo] = useState<AddPlaceType>({
    name: "",
    address: "",
    openHour: "",
    phone: "",
    image: [],
  });

  return (
    <section>
      <PageTitle>매장 추가</PageTitle>
      <div className="grid grid-cols-2 gap-5 mb-30">
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className="font-semibold">
            매장 이름
          </label>
          <Input
            id="name"
            value={addPlaceInfo.name}
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
            value={addPlaceInfo.address}
            onChange={(e) =>
              setAddPlaceInfo({ ...addPlaceInfo, address: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="openHour" className="font-semibold">
            영업시간
          </label>
          <Input id="openHour" />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="phone" className="font-semibold">
            전화번호
          </label>
          <Input
            id="phone"
            value={addPlaceInfo.phone}
            onChange={(e) =>
              setAddPlaceInfo({ ...addPlaceInfo, phone: e.target.value })
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
        <Button className="w-25" size="lg" type="outline">
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
