import User from "../models/userModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, location, bio } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (location) updateData.location = location;
    if (bio) updateData.bio = bio;

    // Handle profile image
    if (req.files && req.files.profileImage) {
      updateData.image = await uploadToCloudinary(req.files.profileImage[0].buffer, "users");
    }
    // Handle resume
    if (req.files && req.files.resume) {
      updateData.resume = await uploadToCloudinary(req.files.resume[0].buffer, "resumes");
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
    }).select("-password");

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Get all users (admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.json({ success: true, users });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Delete user (admin)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};
