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
