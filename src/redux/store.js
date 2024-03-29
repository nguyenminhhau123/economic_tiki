import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import ProductReducer from "./slices/ProductSlice";
export const store = configureStore({
  reducer: {
    product: ProductReducer,
    user: userReducer,
  },
});
