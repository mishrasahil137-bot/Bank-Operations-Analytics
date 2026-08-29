
const express = require("express");
const router = express.Router();

const {
  login,
  createManager
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/login", login);

router.post(
  "/create-manager",
  authMiddleware,
  roleMiddleware("admin"),
  createManager
);

module.exports = router;