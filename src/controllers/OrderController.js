import * as OrderService from "../services/OrderService.js";
export const createOrder = async (req, res) => {
  try {
    const data = await req.body;
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

    if (
      !orderItems ||
      !deliver ||
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !shippingAddress ||
      !totalPrice ||
      !user
    ) {
      return res.status(400).json({
        status: "ERR",
        errMessage: "the input is required",
      });
    } else {
      const response = await OrderService.createOrder(data);
      res.status(200).json(response);
    }
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
