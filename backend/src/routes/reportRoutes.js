
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  downloadExcelReport,
  downloadPDFReport,
} = require("../controllers/reportController");

router.use(authMiddleware);

// Excel
router.get("/excel", downloadExcelReport);

// PDF
router.get("/pdf", downloadPDFReport);

module.exports = router;