import userRouter from "./UserRouter.js";
import productRouter from "./ProductRouter.js";
const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
};
export default routes;
