import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksSlice";

// the store keeps all the app data in one place
export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});
