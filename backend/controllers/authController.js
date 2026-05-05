import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// register a user 

export const register = async (req , res) => {
  try {
    const { name, email, password, role = "student" } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if(!name?.trim() || !normalizedEmail || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required"})
    }

    if (!["student", "employer"].includes(role)) {
      return res.status(400).json({ success: false, message: "Please select a valid role"})
    }

    let image = "";
    if (req.file) {
      image = await uploadToCloudinary(req.file.buffer, "users");
    }
    const existingUser = await User.findOne({email: normalizedEmail});
    if(existingUser) {
      return res.status(409).json({ success: false, message: "User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
      image,
    });

    const userData = user.toObject();
    delete userData.password;

    return res.json({
       success: true,
       message: "User registered successfully",
       user: userData,
    })
  } catch(error) {
    console.error("Signup failed:", error);
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }
    return res.status(500).json({ success: false, message: "Internal server error"})
  }
}

// login user

export const login = async (req , res) => {
  const { email, password } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();
  try {
    if (!normalizedEmail || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    if (!process.env.JWT_SECRET_KEY) {
      console.error("JWT_SECRET_KEY is missing.");
      return res.status(500).json({ success: false, message: "Server configuration error" });
    }

    // admin login
    if(
      normalizedEmail === process.env.ADMIN_EMAIL?.toLowerCase() && 
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email: process.env.ADMIN_EMAIL},
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      return res.json({
        success:true,
        message: "Admin login successfully",
        user: {email: process.env.ADMIN_EMAIL, role: "admin"},
      });
    }

    // user login 
    const user = await User.findOne({email: normalizedEmail});
    if(!user) {
      return res.status(404).json({success: false, message: "User not found"});
  } 
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){
    return res.status(401).json({success: false, message:"Invalid credentials"}); 
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  return res.json({
    success: true,
    message: "User login successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      bio: user.bio,
      phone: user.phone,
      resume: user.resume,
      location: user.location,
    },
  });
 } catch(error) {
    console.error("Login failed:", error);
    return res.status(500).json({ success: false, message: "Internal server error"})
  }
};

// logout

export const logout = async (req , res) => {
  res.clearCookie("token");
  return res.json({
    success: true,
    message: "User logout successfully",
  });
}
