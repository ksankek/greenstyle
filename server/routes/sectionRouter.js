const Router = require("express");
const router = new Router();
const sectionController = require("../controller/sectionController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), sectionController.create);
router.get("/", sectionController.getAll);

module.exports = router;
