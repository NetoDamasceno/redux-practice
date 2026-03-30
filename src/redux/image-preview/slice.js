import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  imageUrl: null,
};

const imagePreviewSlice = createSlice({
  name: "imagePreview",
  initialState,
  reducers: {
    openImage: (state, action) => {
      state.isOpen = true;
      state.imageUrl = action.payload;
    },
    closeImage: (state) => {
      state.isOpen = false;
      state.imageUrl = null;
    },
  },
});

export const { openImage, closeImage } = imagePreviewSlice.actions;

export default imagePreviewSlice.reducer;
