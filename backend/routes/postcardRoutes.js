const express = require("express");
const Postcard = require("../models/Postcard");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new postcard
router.post(
  "/",
  authMiddleware,
  upload.fields([{ name: "photo" }, { name: "voiceMemo" }]),
  async (req, res) => {
    try {
      const { message, location } = req.body;
      const photoUrl = req.files.photo
        ? req.files.photo[0].buffer.toString("base64")
        : null;
      const voiceMemoUrl = req.files.voiceMemo
        ? req.files.voiceMemo[0].buffer.toString("base64")
        : null;

      const postcard = new Postcard({
        photoUrl,
        message,
        voiceMemoUrl,
        location: JSON.parse(location),
        user: req.user._id, // Store the user ID
      });

      await postcard.save();
      res.status(201).json(postcard);
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get all postcards
router.get("/", async (req, res) => {
  try {
    const postcards = await Postcard.find().populate("user", "username"); // Populate user information
    res.status(200).json(postcards);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single postcard by ID
router.get("/:id", async (req, res) => {
  try {
    const postcard = await Postcard.findById(req.params.id).populate(
      "user",
      "username"
    );
    if (!postcard) {
      return res.status(404).json({ message: "Postcard not found" });
    }
    res.status(200).json(postcard);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a postcard by ID
router.put(
  "/:id",
  authMiddleware,
  upload.fields([{ name: "photo" }, { name: "voiceMemo" }]),
  async (req, res) => {
    try {
      const { message, location } = req.body;
      const photoUrl = req.files.photo
        ? req.files.photo[0].buffer.toString("base64")
        : null;
      const voiceMemoUrl = req.files.voiceMemo
        ? req.files.voiceMemo[0].buffer.toString("base64")
        : null;

      const updatedPostcard = await Postcard.findByIdAndUpdate(
        req.params.id,
        {
          photoUrl,
          message,
          voiceMemoUrl,
          location: JSON.parse(location),
        },
        { new: true, runValidators: true }
      );

      if (!updatedPostcard) {
        return res.status(404).json({ message: "Postcard not found" });
      }

      res.status(200).json(updatedPostcard);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete a postcard by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const postcard = await Postcard.findByIdAndDelete(req.params.id);
    if (!postcard) {
      return res.status(404).json({ message: "Postcard not found" });
    }
    res.status(200).json({ message: "Postcard deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
