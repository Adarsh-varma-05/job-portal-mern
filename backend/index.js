import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connectDB.js";

import authRouter from "./routes/authRoutes.js";
import companyRouter from "./routes/companyRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// middlewares
app.use(express.json());

// Debugger/Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    console.log("Body:", JSON.stringify(req.body, null, 2));
  }
  next();
});

app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cookieParser());

// connection to db
connectDB();

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// Api endpoints 
app.get("/", (req, res) =>{
  res.send("Job Portal API is running");
});

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is healthy" });
});

app.use("/auth", authRouter);
app.use("/company", companyRouter);
app.use("/category", categoryRouter);
app.use("/job", jobRouter);
app.use("/application", applicationRouter);
app.use("/user", userRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`
  });
});

app.use((err, req, res, next) => {
  console.error("DEBUG - API Error Stack:", err.stack);
  console.error("DEBUG - Request Info:", {
    method: req.method,
    url: req.url,
    origin: req.headers.origin,
    body: req.body,
  });

  // Force CORS headers in case of error
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");

  if (err.message?.startsWith("CORS blocked")) {
    return res.status(403).json({
      success: false,
      message: "This frontend URL is not allowed by the backend CORS settings",
    });
  }

  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      message: err.code === "LIMIT_FILE_SIZE" ? "File size must be under 5MB" : "File upload failed",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message, // Temporarily expose error message for debugging
  });
});

// connection to db and start server
const startServer = async () => {
  try {
    await connectDB();
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
