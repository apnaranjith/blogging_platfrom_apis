const express = require("express");
const router = express.Router();
const { verifyJWT, checkRole } = require('../Middleware/authMiddleware');
const {validatePostController,getNonValidatedBlogsController}=require("../controllers/moderatorController");

 router.get("/moderator/get-not-validated-blogs",verifyJWT, checkRole("Moderator"),getNonValidatedBlogsController)
 router.post("/moderator/validate/:postId",verifyJWT, checkRole("Moderator"),validatePostController)




module.exports = router;