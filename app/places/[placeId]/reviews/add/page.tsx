"use client";

import Button from "@/components/common/Button";
import FileInput from "@/components/common/FileInput";
import Input from "@/components/common/Input";
import PageTitle from "@/components/common/PageTitle";
import React from "react";
import { FaStar } from "react-icons/fa6";

const AddReviewPage = () => {
  return (
    <section>
      <PageTitle>리뷰 추가 페이지</PageTitle>
      <div className="grid grid-cols-2 gap-x-10 gap-y-20 mb-20">
        <div className="flex flex-col gap-3">
          <p className="font-semibold">별점</p>
          <div className="h-8 flex items-center gap-3">
            <FaStar className="text-[1.2rem]" />
            <FaStar className="text-[1.2rem]" />
            <FaStar className="text-[1.2rem]" />
            <FaStar className="text-[1.2rem]" />
            <FaStar className="text-[1.2rem]" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="address" className="font-semibold">
            방문일
          </label>
          <Input id="address" placeholder="방문일자를 입력해주세요" />
        </div>
        <div className="flex flex-col gap-3 col-span-2">
          <label htmlFor="address" className="font-semibold">
            내용
          </label>
          <textarea id="content" placeholder="리뷰 내용을 입력해주세요" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">이미지 추가</p>
          <FileInput id="image" label="이미지 업로드" />
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <Button className="w-25" size="lg" variant="outline">
          뒤로가기
        </Button>
        <Button className="w-25" size="lg">
          저장
        </Button>
      </div>
    </section>
  );
};

export default AddReviewPage;
