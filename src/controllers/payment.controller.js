import Payment from "../models/Payment.js";
import User from "../models/User.js";

// 🧾 CREATE PAYMENT ENTRY
export const createPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized. Please login.",
      });
    }

    const payment = await Payment.create({
      user: userId,
      amount,
      status: "PENDING",
    });

    res.json({
      message: "Payment initiated",
      paymentId: payment._id,
      upiId: "yourupi@okaxis",
      amount,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// 🔍 VERIFY PAYMENT (USER ENTERS UTR)
export const verifyPayment = async (req, res) => {
  try {
    const { paymentId, utr } = req.body;

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    // ⏳ Expiry check
    if (new Date() > payment.expiresAt) {
      return res.status(400).json({ error: "Payment expired" });
    }

    // 🔁 Already verified
    if (payment.status === "SUCCESS") {
      return res.status(400).json({ error: "Already verified" });
    }

    // 🔒 Duplicate UTR
    const existingUTR = await Payment.findOne({ utr });
    if (existingUTR) {
      return res.status(400).json({ error: "UTR already used" });
    }

    // 🧾 Validate UTR
    if (!utr || utr.length < 8) {
      return res.status(400).json({ error: "Invalid UTR" });
    }

    // ✅ Update payment
    payment.utr = utr;
    payment.status = "SUCCESS";
    await payment.save();

    // 🚀 Upgrade user
    await User.findByIdAndUpdate(payment.user, {
      subscription: "PRO",
    });

    res.json({
      message: "Payment verified successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};