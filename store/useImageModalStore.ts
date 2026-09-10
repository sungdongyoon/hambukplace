import { create } from "zustand";

type ImageModalStore = {
  isImageModal: boolean;
  images: string[];
  selectedIndex: number;
  openImageModal: (images: string[], index?: number) => void;
  closeImageModal: () => void;
};

export const useImageModalStore = create<ImageModalStore>((set) => ({
  isImageModal: false,
  images: [],
  selectedIndex: 0,
  openImageModal: (images, index = 0) => {
    if (!images.length) return;

    set({
      isImageModal: true,
      images,
      selectedIndex: Math.max(0, Math.min(index, images.length - 1)),
    });
  },
  closeImageModal: () =>
    set({
      isImageModal: false,
      images: [],
      selectedIndex: 0,
    }),
}));
