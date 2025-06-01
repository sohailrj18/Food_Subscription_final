import { create } from "zustand";

interface AppState {
  userRole: "admin" | "user";
  filters: {
    mealType: "all" | "veg" | "non-veg";
    spiceLevel: null | "low" | "medium" | "high";
  };
  setFilters: (filters: Partial<AppState["filters"]>) => void;
  setUserRole: (role: AppState["userRole"]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  userRole: "admin",
  filters: {
    mealType: "all",
    spiceLevel: null,
  },
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  setUserRole: (role) => set({ userRole: role }),
}));
