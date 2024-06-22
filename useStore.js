import { create } from "zustand";


export const useStore = create((set) => ({
    bears: 23,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),

    loading: false,
    setLoading: (value) => set({ loading: value }),
    products: [],
    saveProducts: (products) => set({ products }),
}))
