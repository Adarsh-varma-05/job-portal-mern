import express from "express";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
} from "../controllers/categoryController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";

const categoryRouter = express.Router();

categoryRouter.post("/create", isAuthenticated, upload.single("icon"), createCategory);
categoryRouter.get("/all", getAllCategories);
categoryRouter.delete("/delete/:id", isAuthenticated, deleteCategory);

export default categoryRouter;
