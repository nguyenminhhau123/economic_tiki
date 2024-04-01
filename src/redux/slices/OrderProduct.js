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
    removeOrderAllProduct: (state, action) => {
      const { listCheckbox } = action.payload;
      console.log("listProduct", listCheckbox);

      const productItems = state.orderItems?.filter(
        (item) => !listCheckbox.includes(item?.product)
      );
      console.log("productItems", productItems);
      state.orderItems = productItems;
    },
  },
});
export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeOrderAllProduct,
} = orderProduct.actions;

export default orderProduct.reducer;
