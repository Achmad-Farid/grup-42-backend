const Webinar = require("../models/webinarModel");
const axios = require("axios");

// Fungsi komentar user
exports.userComment = async (req, res) => {
  const { comment } = req.body;
  const userId = req.user.id;
  const name = req.user.name; // Dapatkan nama pengguna dari token JWT

  if (!comment) {
    return res.status(400).json({ message: "Comment is required" });
  }

  try {
    // Kirim komentar ke FastAPI untuk analisis sentimen
    const sentimentResponse = await axios.post("http://127.0.0.1:8000/predict", { content: comment });

    const sentiment = sentimentResponse.data.sentiment;

    // Temukan webinar berdasarkan ID
    const webinar = await Webinar.findById(req.params.id);

    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    if (!webinar.comments) {
      webinar.comments = [];
    }

    // Sertakan nama pengguna dan hasil analisis sentimen saat menambahkan komentar
    webinar.comments.push({ user: userId, name, comment, sentiment });

    await webinar.save();

    res.status(201).json(webinar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// fungsi rating user
exports.userRating = async (req, res) => {
  const { rating } = req.body;

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be a number between 1 and 5" });
  }

  try {
    const webinar = await Webinar.findById(req.params.id);

    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    if (!webinar.ratings) {
      webinar.ratings = []; // Inisialisasi jika belum ada rating
    }

    const existingRating = webinar.ratings.find((r) => r.user.toString() === req.user.id);

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
    } else {
      // Tambahkan rating baru
      webinar.ratings.push({ user: req.user.id, rating });
    }

    await webinar.save();
    res.status(201).json(webinar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
