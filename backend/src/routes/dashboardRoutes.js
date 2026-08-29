
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getDashboardSummary,
  getBankSummary,
  getDateSummary,
} = require("../controllers/dashboardController");

// सभी Dashboard Routes Protected
router.use(authMiddleware);

router.get("/", getDashboardSummary);
router.get("/bank-summary", getBankSummary);
router.get("/date-summary", getDateSummary);

module.exports = router;