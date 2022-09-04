const isAuthenticated = require("../middleware/isAuthenticated");
const router = require("express").Router();
const controller = require("../controllers/servers");

router.post("/create", isAuthenticated, controller.createServer);
router.put("/update/:id", isAuthenticated, controller.updateServer);

module.exports = router;
