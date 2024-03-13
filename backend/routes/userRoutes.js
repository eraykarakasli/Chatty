const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  updateUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);
router.put('/', protect, admin, updateUser);

module.exports = router;
