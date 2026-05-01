import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// register a user 

export const register = async (req , res) => {
  try {
    const { name, email, password, role } = req.body;
    if(!name || !email || !password || !role) {
      return res.json({ success: false, message: "All fields are required"})
    }
    const image = req.file ? req.file.filename : "";
    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.json({ success: false, message: "User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      image,
    });
    return res.json({
       success: true,
       message: "User registered successfully",
       user,
    })
  } catch(error) {
    return res.json({ success: false, message: "Internal server error"})
  }
}

// login user

export const login = async (req , res) => {
  const { email, password } = req.body;
  try {
    // admin login
    if(
      email === process.env.ADMIN_EMAIL && 
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
    const user = await User.findOne({email});
    if(!user) {
      return res.json({success: false, message: "user not found"});
  } 
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){
    return res.json({success: false, message:"Invalid credentials"}); 
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
    user,
  });
 } catch(error) {
    return res.json({ success: false, message: "Internal server error"})
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