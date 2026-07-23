import Button from "@/components/common/Button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-primary-strong">
      메인 페이지
      <div>
        <Button size="md" type="outline">
          버튼
        </Button>
      </div>
    </div>
  );
}
