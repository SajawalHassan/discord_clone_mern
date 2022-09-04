const isAuthenticated = require("../middleware/isAuthenticated");
const router = require("express").Router();
const controller = require("../controllers/servers");

router.post("/create", isAuthenticated, controller.createServer);

module.exports = router;
