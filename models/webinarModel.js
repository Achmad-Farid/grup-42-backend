const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String }, // Tambahkan properti untuk menyimpan nama pengguna
  comment: { type: String, required: true },
  sentiment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
});

const webinarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  categories: [{ type: String, required: true }],
  comments: [commentSchema], // Memastikan comments dan ratings adalah array
  ratings: [ratingSchema],
});

module.exports = mongoose.model("Webinar", webinarSchema);
