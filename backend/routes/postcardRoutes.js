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
      const { title, message, location } = req.body;
      const photoUrl = req.files.photo
        ? req.files.photo[0].buffer.toString("base64")
        : null;
      const voiceMemoUrl = req.files.voiceMemo
        ? req.files.voiceMemo[0].buffer.toString("base64")
        : null;

      const postcard = new Postcard({
        title,
        photoUrl,
        message,
        voiceMemoUrl,
        location: JSON.parse(location),
        user: req.user._id,
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
    const postcards = await Postcard.find()
      .populate("user", "username profilePicture")
      .populate({
        path: "comments.user",
        select: "username profilePicture",
      }); // Populate user information
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

// Add a comment to a postcard
router.post("/:id/comments", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    const postcard = await Postcard.findById(req.params.id);

    if (!postcard) {
      return res.status(404).json({ message: "Postcard not found" });
    }

    const comment = {
      user: req.user._id,
      text,
    };

    postcard.comments.push(comment);
    await postcard.save();

    // Populate user information in the comments
    await postcard.populate({
      path: "comments.user",
      select: "username photoUrl",
    });

    console.log("Postcard after adding comment:", postcard);
    res.status(201).json(postcard);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a reaction to a postcard
router.post("/:id/reactions", authMiddleware, async (req, res) => {
  try {
    const { type } = req.body;
    const postcard = await Postcard.findById(req.params.id);

    if (!postcard) {
      return res.status(404).json({ message: "Postcard not found" });
    }

    const reaction = {
      user: req.user._id,
      type,
    };

    postcard.reactions.push(reaction);
    await postcard.save();

    res.status(201).json(postcard);
  } catch (error) {
    console.error("Server error:", error);
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
