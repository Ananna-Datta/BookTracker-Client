// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/BookCreateApi";
// import { bookApi } from "./api/BookCreateApi"; // Make sure this path matches your actual file

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
