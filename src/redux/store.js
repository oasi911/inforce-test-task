import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import commentsSlice from "./comments/commentsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsSlice,
  },
});
