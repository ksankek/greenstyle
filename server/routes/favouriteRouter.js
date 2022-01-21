const Router = require("express");
const router = new Router();
const favouriteController = require("../controller/favouriteController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, favouriteController.addArticle);
router.get("/:favouriteId", authMiddleware, favouriteController.getAll);
router.delete("/:id", authMiddleware, favouriteController.delete);

module.exports = router;
