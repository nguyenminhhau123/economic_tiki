import Order from "../models/OrderModel.js";
export const createOrder = async (data) => {
  const {
    orderItems,
    paymentMethod,
    deliver,
    itemsPrice,
    shippingPrice,
    totalPrice,
    shippingAddress,
    user,
  } = data;

  const { fullName, address, city, phone } = shippingAddress;
  return new Promise(async (resolve, reject) => {
    try {
      const createdOrder = await Order.create({
        orderItems,
        paymentMethod,
        paymentMethod,
        deliver,
        itemsPrice,
        shippingPrice,
        totalPrice,
        shippingAddress: {
          fullName,
          address,
          city,
          phone,
        },
        user,
      });

      if (createdOrder) {
        resolve({
          status: "OK",
          massage: "Success",
          data: createdOrder,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
