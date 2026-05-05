import Job from "../models/jobModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// Create a job (employer)
export const createJob = async (req, res) => {
  console.log("DEBUG - Creating job", { title: req.body.title, employer: req.user?.id });
  try {
    const {
      title,
      company,
      description,
      location,
      salary,
      type,
      requirements,
      benefits,
      jobLevel,
      education,
      experience,
    } = req.body;

    if (!title || !company || !description || !location || !salary || !type) {
      return res.json({ success: false, message: "Required fields are missing" });
    }

    let image = "";
    if (req.file) {
      image = await uploadToCloudinary(req.file.buffer, "jobs");
    }

    // Parse requirements and benefits from comma-separated strings
    const requirementsArray = requirements
      ? requirements.split(",").map((r) => r.trim()).filter(Boolean)
      : [];
    const benefitsArray = benefits
      ? benefits.split(",").map((b) => b.trim()).filter(Boolean)
      : [];

    const job = await Job.create({
      title,
      company,
      description,
      location,
      salary,
      type,
      image,
      requirements: requirementsArray,
      benefits: benefitsArray,
      jobLevel,
      education,
      experience,
      postedDate: new Date().toLocaleDateString(),
      employer: req.user.id,
    });

    console.log("DEBUG - Job created successfully", { jobId: job._id });
    return res.json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  console.log("DEBUG - Fetching all jobs");
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    console.log(`DEBUG - Successfully fetched ${jobs.length} jobs`);
    return res.json({ success: true, jobs });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Get jobs by employer
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id }).sort({
      createdAt: -1,
    });
    return res.json({ success: true, jobs });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Get single job
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }
    return res.json({ success: true, job });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.findByIdAndDelete(id);
    return res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};
