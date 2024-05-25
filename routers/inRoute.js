const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const WebinarController = require("../controllers/webinarController.js");

const authenticateJWT = require("../middleware/authenticateJWT.js");
const authorizeRole = require("../middleware/authorizeRole.js");

// router login dan regis
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/verify/:token", UserController.verify);

// router webinar
// tambah webinar (admins)

router.get("/webinar", WebinarController.getAllWebinar);
router.get("/webinar/:id", WebinarController.getWebinarById);
router.post("/webinar/add", authenticateJWT, authorizeRole(["admin"]), WebinarController.addWebinar);
router.patch("/webinar/edit/:id", authenticateJWT, authorizeRole(["admin"]), WebinarController.editWebinar);
router.delete("/webinar/delete/:id", authenticateJWT, authorizeRole(["admin"]), WebinarController.deleteWebinar);

module.exports = router;
