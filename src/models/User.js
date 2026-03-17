import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    isVerified: { type: Boolean, default: false },

    subscription: {
      type: String,
      enum: ["FREE", "PRO"],
      default: "FREE"
    },

    usage: {
      resumesCreated: { type: Number, default: 0 },
      aiUsageCount: { type: Number, default: 0 }
    },

    savedResumes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);