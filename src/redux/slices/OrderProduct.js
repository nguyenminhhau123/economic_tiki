import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderItems: [],
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    phone: "",
  },
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};
export const orderProduct = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const productItem = state.orderItems?.find(
        (item) => item?.product === orderItem.product
      );
      if (productItem) {
        productItem.amount += orderItem?.amount;
      } else {
        state.orderItems.push(orderItem);
      }
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const productItem = state.orderItems?.find(
        (item) => item?.product === idProduct
      );
      productItem.amount++;
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const productItem = state.orderItems?.find(
        (item) => item?.product === idProduct
      );
      productItem.amount--;
    },
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const productItem = state.orderItems?.filter(
        (item) => item?.product !== idProduct
      );
      state.orderItems = productItem;
    },
  },
});
export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
} = orderProduct.actions;

export default orderProduct.reducer;
