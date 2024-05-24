const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/verify/:token", UserController.verify);
module.exports = router;
