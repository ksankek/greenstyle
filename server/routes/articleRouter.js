const Router = require("express");
const router = new Router();
const articleController = require("../controller/articleContoller");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole= require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), articleController.create);
router.get("/all", articleController.getAll);
router.get("/all/:sectionId", articleController.getAllById);
router.get("/:articleId", articleController.getArticleById)
router.put("/:articleId", checkRole("ADMIN"), articleController.edit);
router.put("/photo/:articleId", checkRole("ADMIN"), articleController.addPhoto)
router.put("/comment/:articleId", authMiddleware, articleController.addComment)
router.delete("/comment/:articleId/:commentId", authMiddleware, articleController.deleteComment)
router.delete("/:articleId", checkRole("ADMIN"), articleController.delete);
router.delete("/:articleId/photo/:fileName", checkRole("ADMIN"), articleController.deletePhoto)

module.exports = router;
