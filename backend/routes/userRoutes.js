const express = require("express");
const {signup,login,allUsers} = require("../controllers/userControllers");
const {protect} = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/register",signup);
router.post("/login",login);
//router.route("/").get(protect,allUsers);
router.get("/getAllUsers",protect,allUsers);
module.exports = router;