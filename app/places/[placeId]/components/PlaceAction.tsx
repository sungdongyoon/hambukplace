"use client";

import Button from "@/components/common/Button";
import { useDeletePlace } from "@/hooks/muataions/usePlacesMutation";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PlaceAction = ({ placeId }: { placeId: string }) => {
  const deletePlace = useDeletePlace();

  const router = useRouter();

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
    <div className="flex items-center justify-end gap-1 mb-6">
      <Link href={`/places/${placeId}/update`}>
        <Button size="sm">수정</Button>
      </Link>
      <Button
        size="sm"
        className="bg-status-negative"
        onClick={handleDeletePlace}
      >
        삭제
      </Button>
    </div>
  );
};

export default PlaceAction;
