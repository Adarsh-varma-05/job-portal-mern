import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "student",
    enum: ["student", "employer", "admin"],
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  resume: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
},
{
  timestamps: true,
}
);
const user = mongoose.model("user", userSchema);
export default user;
    


