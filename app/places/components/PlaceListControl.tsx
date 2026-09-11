import Select from "@/components/common/Select";

const PlaceListControl = () => {
  return (
    <div className="flex items-center gap-3">
      <Select
        ariaLabel="매장 필터"
        defaultLabel="필터"
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
      />
      <Select
        defaultLabel="정렬"
        ariaLabel="매장 정렬"
        option={[
          {
            label: "이름순",
            value: "name",
          },
          {
            label: "최신순",
            value: "latest",
          },
          {
            label: "리뷰 많은 순",
            value: "review-count",
          },
        ]}
      />
    </div>
  );
};

export default PlaceListControl;
