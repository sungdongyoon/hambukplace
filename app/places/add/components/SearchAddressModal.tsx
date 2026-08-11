import Button from "@/components/common/Button";
import React from "react";
import DaumPostcode from "react-daum-postcode";

const SearchAddressModal = ({
  onClose,
  searchAddress,
}: {
  onClose: () => void;
  searchAddress: any;
}) => {
  // 주소 검색 함수
  const handleCompleteAddress = (data: any) => {
    onClose();
    searchAddress(data.address);
  };

  return (
    <div className="w-screen h-screen fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-black/50">
      <div className="w-150 flex flex-col gap-1">
        <div className="border border-line-normal-neutral">
          <DaumPostcode onComplete={handleCompleteAddress} />
        </div>
        <Button className="bg-status-negative" onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  );
};

export default SearchAddressModal;
