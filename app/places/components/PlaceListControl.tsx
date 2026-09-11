"use client";

import Select from "@/components/common/Select";
import { usePlaceControlStore } from "@/store/usePlaceControlStore";

const PlaceListControl = () => {
  // 정렬 상태값
  const sort = usePlaceControlStore((state) => state.sort);
  const setSort = usePlaceControlStore((state) => state.setSort);

  return (
    <div className="flex items-center gap-3">
      {/* <Select
        defaultLabel="필터"
        aria-label="매장 필터"
        option={[
          {
            label: "치즈버거 맛집",
            value: "cheese",
          },
          {
            label: "새우버거 맛집",
            value: "shrimp",
          },
          {
            label: "가성비",
            value: "value-for-money",
          },
          {
            label: "고퀄리티",
            value: "hign-quality",
          },
        ]}
      /> */}
      <Select
        defaultLabel="정렬"
        aria-label="매장 정렬"
        value={sort}
        onChange={(e) => {
          const value = e.currentTarget.value;

          if (value === "latest" || value === "name") {
            setSort(value);
          }
        }}
        option={[
          {
            label: "이름순",
            value: "name",
          },
          {
            label: "최신순",
            value: "latest",
          },
        ]}
      />
    </div>
  );
};

export default PlaceListControl;
