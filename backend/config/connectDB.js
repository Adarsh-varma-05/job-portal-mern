import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is missing. Add it to your backend environment variables.");
    process.exit(1);
  }

  try{
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch(error){
    console.error("Database connection failed!");
    console.error("Error Message:", error.message);
    if (error.message.includes("TIMEOUT")) {
      console.error("Hint: Check your internet connection or firewall.");
    } else if (error.message.includes("querySrv ESERVFAIL")) {
      console.error("Hint: This is often a DNS issue. Try using a different DNS or check your network.");
    } else if (error.message.includes("Could not connect to any servers")) {
      console.error("Hint: Ensure your IP is whitelisted in MongoDB Atlas (Network Access).");
    }
    process.exit(1);
  }
}
