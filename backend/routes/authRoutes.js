import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { upload } from "../middlewares/multer.js";


const authRouter = express.Router();

authRouter.post("/signup",upload.single("image"), register);
authRouter.post("/login",login);
authRouter.get("/logout",logout);

export default authRouter;