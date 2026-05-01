import Job from "../models/jobModel.js";

// Create a job (employer)
export const createJob = async (req, res) => {
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

    const image = req.file ? req.file.filename : "";

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
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
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
