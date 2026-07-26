import { create } from "zustand";

type PlaceSearch = {
  place: string;
  setPlace: (place: string) => void;
  resetPlace: () => void;
};

export const usePlaceStore = create<PlaceSearch>((set) => ({
  place: "",
  setPlace: (place) => set({ place }),
  resetPlace: () => set({ place: "" }),
}));
