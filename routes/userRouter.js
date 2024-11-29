const express = require("express");
const router = express.Router();
const { verifyJWT, checkRole } = require('../Middleware/authMiddleware');
const { createPost,getPosts } = require('../controllers/userController');
router.post("/post",verifyJWT ,checkRole("User"),createPost);
router.get("/posts",verifyJWT,getPosts );
module.exports = router;