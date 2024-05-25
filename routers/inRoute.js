const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const WebinarController = require("../controllers/webinarController.js");
const RatingController = require("../controllers/ratingController.js");

const authenticateJWT = require("../middleware/authenticateJWT.js");
const authorizeRole = require("../middleware/authorizeRole.js");

// router login dan regis
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/verify/:token", UserController.verify);

// router webinar
router.get("/webinar", WebinarController.getAllWebinar);
router.get("/webinar/:id", WebinarController.getWebinarById);
// manipulasi webinar (admin)
router.post("/webinar/add", authenticateJWT, authorizeRole(["admin"]), WebinarController.addWebinar);
router.patch("/webinar/edit/:id", authenticateJWT, authorizeRole(["admin"]), WebinarController.editWebinar);
router.delete("/webinar/delete/:id", authenticateJWT, authorizeRole(["admin"]), WebinarController.deleteWebinar);

// router komen dan rating
router.post("/:id/comments", authenticateJWT, RatingController.userComment);
router.post("/:id/ratings", authenticateJWT, RatingController.userRating);
module.exports = router;
