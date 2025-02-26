const mongoose = require("mongoose");

const PostcardSchema = new mongoose.Schema({
  photoUrl: String,
  message: String,
  voiceMemoUrl: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who posted it
});

PostcardSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Postcard", PostcardSchema);
