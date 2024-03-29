import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  search: "",
  products: [],
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
    setProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});
export const { searchProduct, setProduct } = productSlice.actions;

export default productSlice.reducer;
