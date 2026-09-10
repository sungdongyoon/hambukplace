"use client";

import EmblaSlideButton from "@/components/common/EmblaSlideButton";
import EmptyState from "@/components/common/EmptyState";
import { useImageModalStore } from "@/store/useImageModalStore";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect } from "react";
import { FaX } from "react-icons/fa6";

const ImageModal = () => {
  // store
  const { images, selectedIndex, closeImageModal } = useImageModalStore();

  // embla carousel 훅
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: selectedIndex,
  });

  // esc 누를 시 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeImageModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeImageModal]);

  return (
    <div
      role="dialog"
      className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-15 bg-black/80"
    >
      <button
        type="button"
        className="absolute top-20 right-20 text-[1.6rem] text-static-white cursor-pointer"
        onClick={closeImageModal}
      >
        <FaX />
      </button>
      <div className="relative w-full max-w-250">
        <div
          ref={images?.length ? emblaRef : undefined}
          className="embla h-[75dvh] overflow-hidden"
        >
          <div className="embla__conatiner h-full flex">
            {images.map((el, idx) => (
              <div
                className="embla__slide relative h-full min-w-0 flex-[0_0_100%]"
                key={`${el}-${idx}`}
              >
                <Image
                  src={el}
                  alt={`매장 이미지 ${idx + 1}`}
                  fill
                  sizes="(max-width: 1032px) calc(100vw - 32px), 1000px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          <EmblaSlideButton
            emblaApi={emblaApi}
            className="p-2 bg-black/50 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
