const Router = require("express");
const router = new Router();
const sectionController = require("../controller/sectionController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", sectionController.create);
router.get("/", sectionController.getAll);

module.exports = router;
