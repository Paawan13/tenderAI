// src/features/pdf/pdfSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  numPages: null,
};

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    setNumPages: (state, action) => {
      state.numPages = action.payload;
    },
    goToNextPage: (state) => {
      if (state.currentPage < state.numPages) {
        state.currentPage += 1;
      }
    },
    goToPreviousPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    goToPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setNumPages, goToNextPage, goToPreviousPage, goToPage } =
  pdfSlice.actions;
export default pdfSlice.reducer;
