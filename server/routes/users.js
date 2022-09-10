const isAuth = require("../middleware/isAuth");
const router = require("express").Router();
const controller = require("../controllers/users");

router.get("/me", isAuth, controller.me);

module.exports = router;
