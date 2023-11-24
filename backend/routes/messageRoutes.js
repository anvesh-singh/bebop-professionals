const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddleware");
const {sendMessage,allMessage} = require("../controllers/messageControllers");
//sendMessage route
router.post("/sendMessage",protect,sendMessage);
//get all messages
router.get("/allMessage/:chatId",protect,allMessage);


module.exports = router;