const router = require("express").Router();
const controller = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/protected", isAuth, controller.protected);

module.exports = router;
