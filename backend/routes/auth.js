const router = require("express").Router();

const authController = require("../controllers/auth");

router.post("/", authController.postAuth);

module.exports = router;
