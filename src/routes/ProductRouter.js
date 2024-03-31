import express from "express";
import * as ProductController from "../controllers/ProductController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/create-product", ProductController.createProduct);
router.put("/update-product/:id", ProductController.updateProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);
router.get("/getall-product", ProductController.getAllProduct);
router.get("/getdetails-product/:id", ProductController.getDetailsProduct);
router.post(
  "/deleteMany-product",
  authMiddleware,
  ProductController.deleteManyProduct
);
router.get(
  "/getalltype-product",

  ProductController.getAllTypeProduct
);
// module.exports = router;
export default router;
