import Company from "../models/companyModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// Create a company
export const createCompany = async (req, res) => {
  try {
    const { name, about } = req.body;
    if (!name) {
      return res.json({ success: false, message: "Company name is required" });
    }
    let logo = "";
    if (req.file) {
      logo = await uploadToCloudinary(req.file.buffer, "companies");
    }
    const company = await Company.create({
      name,
      about,
      logo,
      employer: req.user.id,
    });
    return res.json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Get companies by employer
export const getMyCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ employer: req.user.id });
    return res.json({ success: true, companies });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Get all companies (admin)
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate("employer", "name email");
    return res.json({ success: true, companies });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Delete company
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.findByIdAndDelete(id);
    return res.json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};
