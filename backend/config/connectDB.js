import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is missing. Add it to your backend environment variables.");
    process.exit(1);
  }

  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch(error){
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}
