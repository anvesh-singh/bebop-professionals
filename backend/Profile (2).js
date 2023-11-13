const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
} = require("../controllers/Profile");
router.delete("/deleteProfile",deleteAccount);
router.put("/updateProfile",auth,updateProfile);
router.get("/getUserDetails",auth,getAllUserDetails);
//router.put("/updateDisplayPicture",auth,updateDisplayPicture);

module.exports = router;