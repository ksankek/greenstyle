const Router = require("express");
const router = new Router();
const sectionController = require("../controller/sectionController");

router.post("/", sectionController.create);
router.get("/", sectionController.getAll);

module.exports = router;
