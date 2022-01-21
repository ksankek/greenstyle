const Router = require("express");
const router = new Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole= require("../middleware/checkRoleMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById)

module.exports = router;
