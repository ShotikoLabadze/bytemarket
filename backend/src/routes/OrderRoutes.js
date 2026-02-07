import express from "express";
import OrderController from "../controllers/OrderController.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import { AdminMiddleware } from "../middleware/AdminMiddleware.js";

const router = express.Router();

router.post("/", AuthMiddleware, OrderController.createOrder);
router.get("/myorders", AuthMiddleware, OrderController.getUserOrders);

router.get("/", AuthMiddleware, AdminMiddleware, OrderController.getAllOrders);

export default router;
