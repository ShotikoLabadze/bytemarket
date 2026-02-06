import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRoutes from "./routes/userRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";

dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
