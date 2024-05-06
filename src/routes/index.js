import userRouter from "./UserRouter.js";
import productRouter from "./ProductRouter.js";
import orderRouter from "./orderRouter.js";
const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/order", orderRouter);
};
export default routes;
