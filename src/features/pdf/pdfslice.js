<<<<<<< HEAD
// src/features/pdf/pdfSlice.js
=======
// Update to your existing pdfslice.js file
>>>>>>> 25c469c (updated frontend)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  numPages: null,
<<<<<<< HEAD
=======
  isPdfLoading: false, // New state for PDF loading
>>>>>>> 25c469c (updated frontend)
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
<<<<<<< HEAD
    goToPage: (state, action) => {
      state.currentPage = action.payload;
=======
    // New actions for PDF loading state
    setPdfLoading: (state, action) => {
      state.isPdfLoading = action.payload;
>>>>>>> 25c469c (updated frontend)
    },
  },
});

<<<<<<< HEAD
export const { setNumPages, goToNextPage, goToPreviousPage, goToPage } =
  pdfSlice.actions;
export default pdfSlice.reducer;
=======
export const { setNumPages, goToNextPage, goToPreviousPage, setPdfLoading } = pdfSlice.actions;

export default pdfSlice.reducer;
>>>>>>> 25c469c (updated frontend)
