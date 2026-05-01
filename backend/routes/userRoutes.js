import express from "express";
import {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/profile", isAuthenticated, getProfile);
userRouter.put(
  "/update-profile",
  isAuthenticated,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);
userRouter.get("/all", isAuthenticated, getAllUsers);
userRouter.delete("/delete/:id", isAuthenticated, deleteUser);

export default userRouter;
