const isAuth = require("../middleware/isAuth");
const router = require("express").Router();
const controllers = require("../controllers/servers");

router.post("/create", isAuth, controllers.createServer);
router.get("/get/created", isAuth, controllers.getCreatedServers);
router.get("/get/:id", isAuth, controllers.getServerById);

module.exports = router;
