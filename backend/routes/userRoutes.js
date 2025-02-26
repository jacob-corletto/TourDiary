const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Get user profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    console.log("User ID from token:", req.user._id); // Debugging statement
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      console.log("User not found in profile route");
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update User Profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { username, email, profilePicture } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, email, profilePicture },
      { new: true, runValidators: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get User's Notifications
router.get("/notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("notifications");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
