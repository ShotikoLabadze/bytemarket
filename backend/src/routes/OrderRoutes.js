import express from "express";
import OrderController from "../controllers/OrderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, OrderController.createOrder);
router.get("/myorders", protect, OrderController.getUserOrders);

router.get("/", protect, admin, OrderController.getAllOrders);

export default router;
