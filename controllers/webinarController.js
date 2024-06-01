const Webinar = require("../models/webinarModel");

// fungsi mendapat semua webinar
exports.getAllWebinar = async (req, res) => {
  try {
    const webinars = await Webinar.find();
    res.json(webinars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPageWebinar = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;

  const query = category ? { categories: category } : {};

  try {
    const webinars = await Webinar.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Webinar.countDocuments(query);

    res.status(200).json({
      webinars,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchWebinar = async (req, res) => {
  try {
    const { title, description, category, startDate, endDate } = req.query;

    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive regex search
    }

    if (description) {
      query.description = { $regex: description, $options: "i" }; // Case-insensitive regex search
    }

    if (category) {
      query.categories = { $regex: category, $options: "i" }; // Case-insensitive regex search
    }

    if (startDate && endDate) {
      query.startTime = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      query.startTime = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.startTime = { $lte: new Date(endDate) };
    }

    const webinars = await Webinar.find(query);
    res.json(webinars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// fungsi mendapat webinar sesuai id
exports.getWebinarById = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id);
    if (!webinar) return res.status(404).json({ message: "Webinar not found" });
    res.json(webinar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// fungsi menambah webinar oleh admin
exports.addWebinar = async (req, res) => {
  try {
    const webinar = new Webinar(req.body);
    await webinar.validate(); // Validasi data
    await webinar.save();
    res.status(201).json(webinar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// fungsi edit webinar oleh admin
exports.editWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!webinar) return res.status(404).json({ message: "Webinar not found" });
    await webinar.validate(); // Validasi data
    res.json(webinar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// fungsi delete webinar oleh admin
exports.deleteWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findByIdAndDelete(req.params.id);
    if (!webinar) return res.status(404).json({ message: "Webinar not found" });
    res.json({ message: "Webinar deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
