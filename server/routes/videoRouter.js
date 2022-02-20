const Router = require("express");
const router = new Router();
const videoController = require("../controller/videoController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole('ADMIN'), videoController.addVideo);
router.get("/", videoController.getAll);
router.delete("/:videoId", checkRole('ADMIN'), videoController.delete);

module.exports = router;
