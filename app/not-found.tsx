import Button from "@/components/common/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-10">
      <h2 className="text-status-negative text-[2rem] font-semibold">
        잘못된 접근입니다 ‼️
      </h2>
      <Button href="/" type="button" className="bg-status-negative">
        홈으로 가기
      </Button>
    </div>
  );
}
