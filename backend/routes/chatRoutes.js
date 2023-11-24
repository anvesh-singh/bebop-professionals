const express = require("express");
const router = express.Router();
const {accessChat,fetchChats,createGroupChat,renameGroup,removeFromGroup,addToGroup} = require("../controllers/chatControllers");
const {protect} = require("../middlewares/authMiddleware");
//router.route("/").post(protect, accessChat);
router.post("/accessChat",protect,accessChat);
// router.route("/").get(protect, fetchChats);
router.get("/fetchAllChats",protect,fetchChats);
// router.route("/group").post(protect, createGroupChat);
router.post("/group/createGroupChat",protect,createGroupChat);
// router.route("/rename").put(protect, renameGroup);
router.put("/rename",protect,renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
router.put("/removeFromGroup",protect,removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup);
router.put("/addToGroup",protect,addToGroup);

module.exports = router;