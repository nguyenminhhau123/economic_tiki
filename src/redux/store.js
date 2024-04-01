import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import ProductReducer from "./slices/ProductSlice";
import oderProduct from "./slices/OrderProduct";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export const store = configureStore({
  reducer: {
    product: ProductReducer,
    user: userReducer,
    order: oderProduct,
  },
});
