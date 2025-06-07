import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI!;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined");
}

export async function connectDb() {
  if (mongoose.connection.readyState === 1) {
    // Already connected
    return;
  }

  if (mongoose.connection.readyState === 2) {
    // Already connecting
    return;
  }

  try {
    await mongoose.connect(mongoUri, { dbName: "chatApp" });
    console.log("📦 MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
