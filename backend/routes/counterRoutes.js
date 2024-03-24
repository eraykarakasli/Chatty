const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createCounter,
  getCounterByUserId,
} = require("../controllers/counterControllers");

const router = express.Router();

// Yeni bir counter oluşturma endpoint'i
router.post("/", protect, createCounter);

// Belirli bir userId'ye ait counter'ı getirme endpoint'i
router.get("/:userId", protect, getCounterByUserId);

module.exports = router;
