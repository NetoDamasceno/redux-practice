import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // Verificar se o produto já está no carrinho
      const productIsAlreadyInCart = state.products.some(
        (product) => product.id === action.payload.id,
      );

      // Se ele estiver, aumenta a quantidade em 1
      if (productIsAlreadyInCart) {
        state.products = state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        );

        return;
      }

      // se ele não estiver, adicioná-lo
      state.products = [...state.products, { ...action.payload, quantity: 1 }];
    },
    increaseProductQuantity: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      );
    },
    decreaseProductQuantity: (state, action) => {
      state.products = state.products
        .map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        )
        .filter((product) => product.quantity > 0);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },
    clearCart: (state) => {
      state.products = [];
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
