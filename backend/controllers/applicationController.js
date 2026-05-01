import Application from "../models/applicationModel.js";

// Apply for a job
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    if (!jobId) {
      return res.json({ success: false, message: "Job ID is required" });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });
    if (existingApplication) {
      return res.json({ success: false, message: "Already applied to this job" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
    });

    return res.json({
      success: true,
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Get my applications (student)
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate("job")
      .sort({ createdAt: -1 });
    return res.json({ success: true, applications });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Get applicants for employer's jobs
export const getApplicants = async (req, res) => {
  try {
    // Find all jobs posted by the employer
    const Job = (await import("../models/jobModel.js")).default;
    const employerJobs = await Job.find({ employer: req.user.id });
    const jobIds = employerJobs.map((job) => job._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("job", "title")
      .populate("applicant", "name email phone")
      .sort({ createdAt: -1 });

    return res.json({ success: true, applications });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Get all applications (admin)
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job", "title")
      .populate("applicant", "name email phone")
      .sort({ createdAt: -1 });
    return res.json({ success: true, applications });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Update application status (employer/admin)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return res.json({
      success: true,
      message: "Status updated successfully",
      application,
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};
