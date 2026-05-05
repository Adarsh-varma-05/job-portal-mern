import Category from "../models/categoryModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// Create a category (admin)
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ success: false, message: "Category name is required" });
    }
    let icon = "";
    if (req.file) {
      icon = await uploadToCloudinary(req.file.buffer, "categories");
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ success: false, message: "Category already exists" });
    }
    const category = await Category.create({ name, icon });
    return res.json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json({ success: true, categories });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Delete a category (admin)
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};
