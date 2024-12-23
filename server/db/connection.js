import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Connected to MongoDB"))
      .catch((error) => console.error("MongoDB connection error:", error));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
