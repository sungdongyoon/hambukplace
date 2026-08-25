"use client";

import Button from "@/components/common/Button";
import { useDeletePlace } from "@/hooks/muataions/usePlacesMutation";
import { useBreakPoint } from "@/hooks/useBreakPoint";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const PlaceAction = ({
  placeId,
  className,
}: {
  placeId: string;
  className?: string;
}) => {
  const router = useRouter();
  const xsBreakPoint = useBreakPoint("xs");
  const deletePlace = useDeletePlace();

  // 매장 정보 삭제 함수
  const handleDeletePlace = () => {
    deletePlace.mutate(placeId, {
      onSuccess: () => {
        alert("매장 정보가 삭제되었습니다!");
        router.replace("/places");
      },
      onError: (error) => {
        console.error("매장 정보 삭제 실패", error);
        alert("매장 정보 삭제 실패!");
      },
    });
  };

  return (
    <div
      className={twMerge(`flex items-center justify-end gap-1 ${className}`)}
    >
      <Link href={`/places/${placeId}/update`} className="inline-flex">
        <Button size={xsBreakPoint ? "xs" : "sm"}>수정</Button>
      </Link>
      <Button
        size={xsBreakPoint ? "xs" : "sm"}
        className="bg-status-negative"
        onClick={handleDeletePlace}
      >
        삭제
      </Button>
    </div>
  );
};

export default PlaceAction;
