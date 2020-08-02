const router = require("express").Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const newsController = require("../controllers/news");

router.get("/", [auth], newsController.getAllNews);

router.get("/:id", [auth], newsController.getNews);

router.post("/", [auth], newsController.postNews);

router.put("/:id", [auth], newsController.putNews);

router.delete("/:id", [auth, admin], newsController.deleteNews);

/* router.get("/", newsController.getAllNews);

router.get("/:id", newsController.getNews);

router.post("/", newsController.postNews);

router.put("/:id", newsController.putNews);

router.delete("/:id", newsController.deleteNews); */

module.exports = router;
