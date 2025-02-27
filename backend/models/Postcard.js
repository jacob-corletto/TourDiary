const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ReactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true }, // e.g., 'like', 'love', 'laugh'
});

const PostcardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  photoUrl: String,
  message: String,
  voiceMemoUrl: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [CommentSchema],
  reactions: [ReactionSchema],
});

PostcardSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Postcard", PostcardSchema);
