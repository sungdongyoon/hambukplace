import { create } from "zustand";

type PlaceSearch = {
  placeName: string;
  selectedPlaceId: string | null;
  setPlaceName: (placeName: string) => void;
  setSelectedPlaceId: (id: string | null) => void;
  resetPlace: () => void;
};

export const usePlaceStore = create<PlaceSearch>((set) => ({
  placeName: "",
  selectedPlaceId: null,
  setPlaceName: (placeName) => set({ placeName }),
  setSelectedPlaceId: (id) => set({ selectedPlaceId: id }),
  resetPlace: () => set({ placeName: "" }),
}));
