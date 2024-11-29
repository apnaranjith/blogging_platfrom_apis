const express = require("express");
const { registerAdmin, registerUser, login } = require("../controllers/authController");

const router = express.Router();
router.post("/admin/register", registerAdmin);
router.post("/user/register", registerUser);
router.post("/login", login);

module.exports = router;
