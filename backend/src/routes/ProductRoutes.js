import ProductController from "../controllers/ProductController.js";
import express from "express";
const router = express.Router();

router.get("/", ProductController.getProducts);

export default router;
