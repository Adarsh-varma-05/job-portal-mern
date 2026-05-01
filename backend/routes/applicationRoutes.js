import express from "express";
import {
  applyJob,
  getMyApplications,
  getApplicants,
  getAllApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const applicationRouter = express.Router();

applicationRouter.post("/apply", isAuthenticated, applyJob);
applicationRouter.get("/my-applications", isAuthenticated, getMyApplications);
applicationRouter.get("/applicants", isAuthenticated, getApplicants);
applicationRouter.get("/all", isAuthenticated, getAllApplications);
applicationRouter.put("/status/:id", isAuthenticated, updateApplicationStatus);

export default applicationRouter;
