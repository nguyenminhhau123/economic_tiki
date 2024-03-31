import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import ProductReducer from "./slices/ProductSlice";
import oderProduct from "./slices/OrderProduct";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    user: userReducer,
    order: oderProduct,
  },
});
