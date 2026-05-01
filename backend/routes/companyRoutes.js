import express from "express";
import {
  createCompany,
  getMyCompanies,
  getAllCompanies,
  deleteCompany,
} from "../controllers/companyController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";

const companyRouter = express.Router();

companyRouter.post("/create", isAuthenticated, upload.single("logo"), createCompany);
companyRouter.get("/my-companies", isAuthenticated, getMyCompanies);
companyRouter.get("/all", isAuthenticated, getAllCompanies);
companyRouter.delete("/delete/:id", isAuthenticated, deleteCompany);

export default companyRouter;
