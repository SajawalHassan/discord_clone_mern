const isAuth = require("../middleware/isAuth");
const router = require("express").Router();
const controller = require("../controllers/messages");

router.post("/create", isAuth, controller.createMessage);
router.get("/get/all/:serverId", isAuth, controller.getAllMessagesInServer);

module.exports = router;
