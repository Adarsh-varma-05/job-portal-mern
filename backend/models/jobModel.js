import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Remote", "Internship", "Contract", "full-time", "part-time"],
    },
    image: {
      type: String,
      default: "",
    },
    requirements: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    jobLevel: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    postedDate: {
      type: String,
      default: "",
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Closed", "Pending"],
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("job", jobSchema);
export default Job;
