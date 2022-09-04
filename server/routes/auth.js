const router = require("express").Router();
const controller = require("../controllers/auth");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/refresh-token", controller.refreshToken);
router.get("/protected", isAuthenticated, controller.protected);

module.exports = router;
