import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderItems: [],
  orderItemsSelected: [],
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    phone: "",
  },
  createOrderStore: {},
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
      const itemOrderSelected = state.orderItemsSelected?.find(
        (item) => item?.product === idProduct
      );
      productItem.amount++;
      if (itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const productItem = state.orderItems?.find(
        (item) => item?.product === idProduct
      );
      const itemOrderSelected = state.orderItemsSelected?.find(
        (item) => item?.product === idProduct
      );
      productItem.amount--;
      if (itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const productItem = state.orderItems?.filter(
        (item) => item?.product !== idProduct
      );
      const itemOrderSelected = state.orderItemsSelected?.filter(
        (item) => item?.product !== idProduct
      );
      state.orderItems = productItem;
      state.orderItemsSelected = itemOrderSelected;
    },
    removeOrderAllProduct: (state, action) => {
      const { listCheckbox } = action.payload;

      const productItems = state.orderItems?.filter(
        (item) => !listCheckbox.includes(item?.product)
      );
      const itemOrderSelected = state.orderItemsSelected?.filter(
        (item) => !listCheckbox.includes(item?.product)
      );
      state.orderItems = productItems;
      state.orderItemsSelected = itemOrderSelected;
    },
    setSelectedOrderItems: (state, action) => {
      const { listCheckbox } = action.payload;
      console.log("listCheckbox", listCheckbox);

      if (listCheckbox) {
        // Kiểm tra nếu listCheckbox không phải là undefined
        let itemsSelected = [];
        state.orderItems.forEach((order) => {
          if (listCheckbox.includes(order.product)) {
            itemsSelected.push(order);
          }
        });
        state.orderItemsSelected = itemsSelected;
      }
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    resetItemsOrder: (state, action) => {
      state.orderItems = [];
    },
    createOrderStore: (state, action) => {
      state.createOrderStore = action.payload;
    },
    clearItems: (state, action) => {
      state.orderItems = [];
      state.createOrderStore = {};
      state.shippingAddress = {};
      state.orderItemsSelected = [];
    },
  },
});
export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeOrderAllProduct,
  setSelectedOrderItems,
  setShippingAddress,
  resetItemsOrder,
  createOrderStore,
  clearItems,
} = orderProduct.actions;

export default orderProduct.reducer;
