import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
dotenv.config();

import authRouter from "./routes/authRoutes.js";
import companyRouter from "./routes/companyRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];

// middlewares
app.use(express.json());
app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(cookieParser());

// connection to db
connectDB();

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// Api endpoints 
app.get("/", (req, res) =>{
  res.send("Job Portal API is running");
});

app.use("/auth", authRouter);
app.use("/company", companyRouter);
app.use("/category", categoryRouter);
app.use("/job", jobRouter);
app.use("/application", applicationRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`);
});
