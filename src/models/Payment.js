import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
  utr: String,
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING",
  },
  plan: {
  type: String,
  enum: ["PRO"],
  default: "PRO"
},
  expiresAt: {
  type: Date,
  default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 min
}
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);