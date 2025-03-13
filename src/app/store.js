// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import pdfReducer from "../features/pdf/pdfslice";

const store = configureStore({
  reducer: {
    pdf: pdfReducer,
  },
});

export default store;
