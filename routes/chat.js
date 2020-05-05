const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const chatController = require("../controllers/chat");

router.get("/get", authMiddleware.verifyUser, chatController.getChats);
router.post("/send", authMiddleware.verifyUser, chatController.sendChat);

module.exports = router;
