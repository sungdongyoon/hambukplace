"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import NaverMap from "@/components/NaverMap";
import { usePlaceStore } from "@/store/usePlaceStore";

import Image from "next/image";

export default function Home() {
  const { place, setPlace } = usePlaceStore();
  return (
    <div className="text-primary-strong">
      장소 - {place}
      <NaverMap />
    </div>
  );
}
