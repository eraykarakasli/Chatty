const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  deleteQuickChat,
  quickChat,
  getQuickMessages,
} = require("../controllers/quickController");

const router = express.Router();

router.route("/").post(protect, quickChat);
router.post('/delete', protect, deleteQuickChat);
router.get('/', getQuickMessages);

module.exports = router;
