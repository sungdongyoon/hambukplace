"use client";

import Button from "@/components/common/Button";
import { useDeletePlace } from "@/hooks/muataions/usePlacesMutation";
import { useBreakPoint } from "@/hooks/useBreakPoint";
import { useAuthStore } from "@/store/useAuthStore";
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
  // 로그인 상태
  const { user, isAuthLoading } = useAuthStore();

  const router = useRouter();

  // break point 커스텀 훅
  const xsBreakPoint = useBreakPoint("xs");

  // 매장 정보 삭제 뮤테이션
  const deletePlace = useDeletePlace();

  // 매장 정보 삭제 함수
  const handleDeletePlace = () => {
    if (confirm("매장 정보를 삭제하시겠습니까?")) {
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
    }
  };

  if (!user) {
    return null;
  }

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
