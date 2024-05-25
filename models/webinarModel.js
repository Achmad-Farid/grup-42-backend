const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  comments: [{ user: String, comment: String, createdAt: { type: Date, default: Date.now } }],
  ratings: [{ user: String, rating: Number }],
});
module.exports = mongoose.model("Webinar", webinarSchema);
