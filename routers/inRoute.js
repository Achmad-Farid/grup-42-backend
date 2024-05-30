const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const WebinarController = require("../controllers/webinarController.js");
const RatingController = require("../controllers/ratingController.js");
const validate = require("../middleware/validator");
const validateRequest = require("../middleware/validateRequest");
const authenticateJWT = require("../middleware/authenticateJWT.js");
const authorizeRole = require("../middleware/authorizeRole.js");

// router login dan regis
router.post("/signup", validate.validateSignup, validateRequest, UserController.signup);
router.post("/login", validate.validateLogin, validateRequest, UserController.login);
router.get("/verify/:token", UserController.verify);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-pasword/:token", UserController.resetPassword);

// router webinar
router.get("/webinar", WebinarController.getAllWebinar);
router.get("/webinar/page", WebinarController.getPageWebinar);
router.get("/webinar/:id", WebinarController.getWebinarById);
// manipulasi webinar (admin)
router.post("/webinar/add", authenticateJWT, authorizeRole(["admin"]), validate.validateWebinar, validateRequest, WebinarController.addWebinar);
router.patch("/webinar/edit/:id", authenticateJWT, authorizeRole(["admin"]), validate.validateWebinarUpdate, validateRequest, WebinarController.editWebinar);
router.delete("/webinar/delete/:id", authenticateJWT, authorizeRole(["admin"]), validate.validateWebinarDelete, validateRequest, WebinarController.deleteWebinar);

// router komen dan rating
router.post("/:id/comments", authenticateJWT, validate.validateComment, validateRequest, RatingController.userComment);
router.post("/:id/ratings", authenticateJWT, validate.validateRating, validateRequest, RatingController.userRating);

module.exports = router;
