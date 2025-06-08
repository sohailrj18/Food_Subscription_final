import { create } from "zustand";

interface AppState {
  filters: {
    userStatus: "" | "active" | "inactive";
    restaurantStatus: "" | "active" | "inactive";
    mealType: "" | "veg" | "non-veg";
    spiceLevel: "" | "mild" | "medium" | "hot";
    search: string;
  };
  setFilters: (filters: Partial<AppState["filters"]>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  filters: {
    userStatus: "",
    restaurantStatus: "",
    mealType: "",
    spiceLevel: "",
    search: "",
  },
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
}));
