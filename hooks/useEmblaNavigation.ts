import { EmblaCarouselType } from "embla-carousel";
import { useCallback } from "react";

// Embla 캐러셀 prev, next 커스텀 훅
export const useEmblaNavigation = (emblaApi: EmblaCarouselType | undefined) => {
  const slidePrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const slideNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return {
    slideNext,
    slidePrev,
  };
};
