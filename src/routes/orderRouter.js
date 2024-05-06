import express from "express";
import * as OrderController from "../controllers/OrderController.js";
import {
  authMiddleware,
  authUserMiddleware,
} from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/create", OrderController.createOrder);

export default router;
