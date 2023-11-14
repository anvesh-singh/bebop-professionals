const express = require("express");
const router = express.Router();
const{
    login,
    signup,
    sendotp,
    changePassword,
} = require("../controllers/Auth");
const{
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword");

const {auth} = require("../middlewares/auth");

//Routes for login signup and authentication


//Route for user login
router.post("/login",login);
//Route for user signup
router.post("/signup",signup);
//Route for sending the otp
router.post("/sendotp",sendotp);
//Route for changing the password
router.post("/changepassword",auth,changePassword);

//Route for generating a reset password token
router.post("/reset-password-token",resetPassword);
//Route for reseting users password after verification
router.post("/reset-password",resetPassword);
//export the router for use in the main appication

module.exports = router;