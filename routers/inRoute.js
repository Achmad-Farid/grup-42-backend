const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const WebinarController = require("../controllers/webinarController.js");
const RatingController = require("../controllers/ratingController.js");
const validate = require("../middleware/validator");
const validateRequest = require("../middleware/validateRequest");
const authenticateJWT = require("../middleware/authenticateJWT.js");
const authorizeRole = require("../middleware/authorizeRole.js");
const multer = require("multer");
const path = require("path");
const uploadimg = require("../middleware/multer.js");

// router login dan regis
router.post("/signup", validate.validateSignup, validateRequest, UserController.signup);
router.post("/login", validate.validateLogin, validateRequest, UserController.login);
router.get("/verify/:token", UserController.verify);
router.post("/forgot-password", validate.validateForgot, validateRequest, UserController.forgotPassword);
router.post("/reset-pasword/:token", validate.validateReset, validateRequest, UserController.resetPassword);

// router webinar
router.get("/webinar", WebinarController.getAllWebinar);
router.get("/webinar/page", WebinarController.getPageWebinar);
router.get("/webinar/search", WebinarController.searchWebinar);
router.get("/webinar/:id", WebinarController.getWebinarById);

/// Konfigurasi penyimpanan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Menyimpan file di folder 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Memberikan nama file dengan timestamp
  },
});

// Filter file untuk menerima hanya gambar
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|bmp/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("File yang diunggah harus berupa gambar (jpeg, jpg, png, gif, bmp)"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// manipulasi webinar (admin)
router.post("/webinar/add", authenticateJWT, authorizeRole(["admin"]), validate.validateWebinar, upload.single("image"), validateRequest, WebinarController.addWebinar);
router.patch("/webinar/edit/:id", uploadimg.single("image"), authenticateJWT, authorizeRole(["admin"]), validate.validateWebinarUpdate, validateRequest, WebinarController.editWebinar);
router.delete("/webinar/delete/:id", authenticateJWT, authorizeRole(["admin"]), validate.validateWebinarDelete, validateRequest, WebinarController.deleteWebinar);

// router komen dan rating
router.post("/:id/comments", authenticateJWT, validate.validateComment, validateRequest, RatingController.userComment);
router.post("/:id/ratings", authenticateJWT, validate.validateRating, validateRequest, RatingController.userRating);

module.exports = router;
