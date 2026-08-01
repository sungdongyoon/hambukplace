"use client";

import Button from "@/components/common/Button";
import FileInput from "@/components/common/FileInput";
import Input from "@/components/common/Input";
import PageTitle from "@/components/common/PageTitle";
import RadioGroup from "@/components/common/RadioGroup";
import React, { useState } from "react";
import OpenHoursSection from "./components/OpenHoursSection";

type OpenHourType = "daily" | "weekday-weekend" | "by-day" | "unknown";

type AddPlaceType = {
  name: string;
  address: string;
  openHour: OpenHourType;
  phone: string;
  image: File[];
};

const PlaceAddPage = () => {
  // 매장 등록 정보
  const [addPlaceInfo, setAddPlaceInfo] = useState<AddPlaceType>({
    name: "",
    address: "",
    openHour: "daily",
    phone: "",
    image: [],
  });

  console.log("add", addPlaceInfo);

  return (
    <section>
      <PageTitle>매장 추가</PageTitle>
      <div className="grid grid-cols-2 gap-x-5 gap-y-20 mb-20">
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
            value={addPlaceInfo.address}
            placeholder="매장 주소를 입력해주세요"
            onChange={(e) =>
              setAddPlaceInfo({ ...addPlaceInfo, address: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">영업시간</p>
          <RadioGroup
            name="openHour"
            value={addPlaceInfo.openHour}
            onChange={(e) => setAddPlaceInfo({ ...addPlaceInfo, openHour: e })}
            groupClassName="my-2"
            options={[
              {
                label: "매일",
                value: "daily",
              },
              {
                label: "주말/평일",
                value: "weekday-weekend",
              },
              {
                label: "요일별",
                value: "by-day",
              },
              {
                label: "정보없음",
                value: "unknown",
              },
            ]}
          />
          <OpenHoursSection type={addPlaceInfo.openHour} />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="phone" className="font-semibold">
            전화번호
          </label>
          <Input
            id="phone"
            value={addPlaceInfo.phone}
            placeholder="매장 전화번호를 입력해주세요"
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
