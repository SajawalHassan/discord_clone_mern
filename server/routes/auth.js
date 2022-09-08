const router = require("express").Router();
const controller = require("../controllers/auth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/refresh-token", controller.refreshToken);

module.exports = router;
