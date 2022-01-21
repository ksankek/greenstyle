const Router = require("express");
const router = new Router();
const videoController = require("../controller/videoController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", videoController.addVideo);
router.get("/:sectionId", videoController.getAll);
router.delete("/:videoId", videoController.delete);

module.exports = router;
