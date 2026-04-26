import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartOpen: false,
  loginModalOpen: false,
  cartPreviewOpen: false,
  confirmClearCartOpen: false,
  searchOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCart: (state) => {
      state.cartOpen = true;
    },
    closeCart: (state) => {
      state.cartOpen = false;
    },

    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },

    openCartPreview: (state) => {
      state.cartPreviewOpen = true;
    },
    closeCartPreview: (state) => {
      state.cartPreviewOpen = false;
    },

    openConfirmClearCart: (state) => {
      state.confirmClearCartOpen = true;
    },
    closeConfirmClearCart: (state) => {
      state.confirmClearCartOpen = false;
    },

    openSearch: (state) => {
      state.searchOpen = true;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
  },
});

export const {
  openCart,
  closeCart,
  openLoginModal,
  closeLoginModal,
  openCartPreview,
  closeCartPreview,
  openConfirmClearCart,
  closeConfirmClearCart,
  openSearch,
  closeSearch,
} = uiSlice.actions;

export default uiSlice.reducer;
