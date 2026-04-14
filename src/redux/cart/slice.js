import { createSlice } from "@reduxjs/toolkit";

const CART_EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24h

// 🔥 pegar do localStorage com expiração
const loadCartFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem("cart");

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    // ⏰ verifica expiração
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem("cart");
      return [];
    }

    return parsed.data || [];
  } catch {
    return [];
  }
};

// 🔥 salvar com expiração
const saveCartToLocalStorage = (products) => {
  const payload = {
    data: products,
    expiresAt: Date.now() + CART_EXPIRATION_TIME,
  };

  localStorage.setItem("cart", JSON.stringify(payload));
};

const initialState = {
  products: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productIsAlreadyInCart = state.products.some(
        (product) => product.id === action.payload.id
      );

      if (productIsAlreadyInCart) {
        state.products = state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        state.products = [
          ...state.products,
          { ...action.payload, quantity: 1 },
        ];
      }

      saveCartToLocalStorage(state.products);
    },

    increaseProductQuantity: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );

      saveCartToLocalStorage(state.products);
    },

    decreaseProductQuantity: (state, action) => {
      state.products = state.products
        .map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0);

      saveCartToLocalStorage(state.products);
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );

      saveCartToLocalStorage(state.products);
    },

    clearCart: (state) => {
      state.products = [];
      saveCartToLocalStorage([]);
    },
  },
});

export const {
  addProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
