const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// Get All Transactions
router.get("/", authMiddleware, getTransactions);

// Add Transaction
router.post("/", authMiddleware, createTransaction);

// Update Transaction
router.put("/:id", authMiddleware, updateTransaction);

// Delete Transaction
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;