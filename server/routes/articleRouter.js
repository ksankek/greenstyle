const Router = require("express");
const router = new Router();
const articleController = require("../controller/articleContoller");
const checkRole= require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), articleController.create);
router.get("/", articleController.getAll);
router.get("/:articleId", articleController.getArticleById)
router.put("/:articleId", checkRole("ADMIN"), articleController.edit);
router.put("/:articleId/photo", checkRole("ADMIN"), articleController.addPhoto)
router.delete("/:articleId", checkRole("ADMIN"), articleController.delete);
router.delete("/:articleId/photo/:fileName", checkRole("ADMIN"), articleController.deletePhoto)

module.exports = router;
