import { create } from "zustand";

export const useStore = create((set) => ({
    //Auth
    session: null,
    setSession: (session) => set({ session }),
    email: null,
    saveEmail: (email) => set({ email }),
    password: null,
    savePassword: (password) => set({ password }),

    loading: false,
    setLoading: (value) => set({ loading: value }),
    showCart: false,
    setShowCart: (value) => set({ showCart: value }),

    products: [],
    saveProducts: (products) => set({ products }),

    filter: "Position",
    setFilter: (filter) => set({ filter }),
    showFilter: false,
    toggleShowFilter: (showFilter) => set({ showFilter }),
    filters: ["Position", "Best Selling", "Price (Low to High)", "Price (High to Low)"],
    filteredProducts: [],
    saveFilteredProducts: (filteredProducts) => set({ filteredProducts }),


    selectedProduct: null,
    selectProduct: (id) => set((state) => ({
        selectedProduct: state.products.find((item) => item.id === id),
    })),

    cart: [],
    setCart: (data) => set({ cart: Array.isArray(data) ? data : [] }),
    localCart: [],
    setLocalCart: (product) => set({ localCart: product }),
}));
