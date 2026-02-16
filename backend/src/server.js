import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB Middleware Error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

export default app;
