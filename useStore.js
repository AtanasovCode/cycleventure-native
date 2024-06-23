import { create } from "zustand";

export const useStore = create((set) => ({
    //Auth
    email: null,
    saveEmail: (email) => set({ email }),
    password: null,
    savePassword: (password) => set({ password }),

    loading: false,
    setLoading: (value) => set({ loading: value }),

    products: [],
    saveProducts: (products) => set({ products }),

    selectedProduct: null,
    selectProduct: (id) => set((state) => ({
        selectedProduct: state.products.find((item) => item.id === id),
    })),

    cart: [],
    addToCart: (product) => set((state) => ({
        cart: [product, ...state.cart]
    }))
}));
