import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Reviewed", "Shortlisted", "Rejected", "Hired"],
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("application", applicationSchema);
export default Application;
