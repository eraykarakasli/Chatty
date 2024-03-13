const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createNotify,
  deleteNotify,
  getNotifies,
} = require("../controllers/notifyControllers");

const router = express.Router();

router.post("/", protect, createNotify);
router.delete("/delete",  deleteNotify);
router.get("/:userId",protect,  getNotifies);

module.exports = router; 
