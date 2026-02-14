import ProductController from "../controllers/ProductController.js";
import express from "express";
import { AdminMiddleware } from "../middleware/AdminMiddleware.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.get("/", ProductController.getProducts);
router.get("/search", ProductController.searchProducts);
router.post(
  "/",
  AuthMiddleware,
  AdminMiddleware,
  ProductController.createProduct,
);
router.get("/:id", ProductController.getById);

export default router;
