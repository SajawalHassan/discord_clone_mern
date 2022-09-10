const isAuth = require("../middleware/isAuth");
const router = require("express").Router();
const controllers = require("../controllers/servers");

router.post("/create", isAuth, controllers.createServer);

module.exports = router;
