import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    isConnected = db.connections[0].readyState;
    console.log("MongoDB New Connection Created");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);

    throw error;
  }
};

export default connectDB;
