import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import ProductReducer from "./slices/ProductSlice";
import oderProduct from "./slices/OrderProduct";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
// combineReducers là một hàm thuộc Redux được sử dụng để kết hợp nhiều reducer thành một reducer duy nhất để sử dụng trong cấu trúc trạng thái của Redux.
const rootReducer = combineReducers({
  product: ProductReducer,
  user: userReducer,
  order: oderProduct,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
// export const store = configureStore({
//   reducer: {
//     product: ProductReducer,
//     user: userReducer,
//     order: oderProduct,
//   },
// });
