const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const transactionController = require("../controllers/transactionController");

// GET All
router.get("/", authMiddleware, transactionController.getTransactions);

// ADD
router.post("/", authMiddleware, transactionController.addTransaction);

// UPDATE
router.put("/:id", authMiddleware, transactionController.updateTransaction);

// DELETE (IMPORTANT)
router.delete("/:id", authMiddleware, transactionController.deleteTransaction);

module.exports = router;