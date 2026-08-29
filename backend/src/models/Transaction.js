
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "withdrawal", "atm", "internet_transfer"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    remarks: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);