const express = require("express");
const router = express.Router();
// const express = require('express');
const {assignModerator,fetchUsers,blockUser}=require("../controllers/adminController")
const { verifyJWT, checkRole } = require('../Middleware/authMiddleware');
router.post("/admin/assignModerator", verifyJWT, checkRole("Admin"), assignModerator);

 router.get("/admin/users",verifyJWT, checkRole('Admin'), fetchUsers);
 router.post('/admin/block/:userId', verifyJWT, checkRole('Admin'), blockUser)
// router.post("//admin/block/:userId",)
module.exports = router;