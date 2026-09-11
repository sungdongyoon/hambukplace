import { PlaceSortType } from "@/types/place";
import { create } from "zustand";

type PlaceListControl = {
  sort: PlaceSortType;
  setSort: (sort: PlaceSortType) => void;
};

export const usePlaceControlStore = create<PlaceListControl>((set) => ({
  sort: "latest",
  setSort: (sort) => set({ sort }),
}));
