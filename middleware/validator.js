const { body, param } = require("express-validator");

const validateWebinar = [
  body("title").not().isEmpty().trim().escape(),
  body("description").not().isEmpty().trim().escape(),
  body("link").not().isEmpty().trim().escape(),
  body("image").not().isEmpty().trim().escape(),
  body("startTime").not().isEmpty().isISO8601().toDate(),
  body("endTime").not().isEmpty().isISO8601().toDate(),
  body("categories").not().isEmpty().trim().escape(),
];

const validateWebinarUpdate = [
  param("id").isMongoId().withMessage("Invalid Webinar ID"),
  body("title").optional().trim().escape(),
  body("description").optional().trim().escape(),
  body("image").optional().trim().escape(),
  body("startTime").optional().isISO8601().toDate(),
  body("endTime").optional().isISO8601().toDate(),
  body("category").optional().trim().escape(),
];

const validateWebinarDelete = [
  param("id").isMongoId().withMessage("Invalid Webinar ID"), // Validasi ID webinar
];

const validateLogin = [body("username").not().isEmpty().trim().escape(), body("password").not().isEmpty().trim().escape()];

const validateForgot = [body("email").not().isEmpty().trim().escape()];

const validateReset = [body("newPassword").not().isEmpty().trim().escape()];

const validateSignup = [body("username").not().isEmpty().trim().escape(), body("name").not().isEmpty().trim().escape(), body("password").not().isEmpty().trim().escape(), body("email").not().isEmpty().trim().escape()];

const validateComment = [body("comment").not().isEmpty().trim().escape()];

const validateRating = [body("rating").not().isEmpty().trim().escape()];

module.exports = {
  validateWebinar,
  validateWebinarUpdate,
  validateWebinarDelete,
  validateLogin,
  validateForgot,
  validateReset,
  validateSignup,
  validateComment,
  validateRating,
};
