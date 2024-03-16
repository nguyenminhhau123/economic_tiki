import express from "express";
import * as ProductController from "../controllers/ProductController.js";

const router = express.Router();
router.post("/create-product", ProductController.createProduct);
router.put("/update-product/:id", ProductController.updateProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);
router.get("/getall-product", ProductController.getAllProduct);
router.get("/getdetails-product/:id", ProductController.getDetailsProduct);

// module.exports = router;
export default router;
