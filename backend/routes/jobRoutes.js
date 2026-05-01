import express from "express";
import {
  createJob,
  getAllJobs,
  getMyJobs,
  getJobById,
  deleteJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";

const jobRouter = express.Router();

jobRouter.post("/create", isAuthenticated, upload.single("image"), createJob);
jobRouter.get("/all", getAllJobs);
jobRouter.get("/my-jobs", isAuthenticated, getMyJobs);
jobRouter.get("/:id", getJobById);
jobRouter.delete("/delete/:id", isAuthenticated, deleteJob);

export default jobRouter;
