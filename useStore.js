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

    selectedProduct: null,
    selectProduct: (id) => set((state) => ({
        selectedProduct: state.products.find((item) => item.id === id),
    })),

    cart: [],
    setCart: (data) => set({ cart: data }),
    localCart: [],
    setLocalCart: (product) => set({ localCart: product }),
}));
