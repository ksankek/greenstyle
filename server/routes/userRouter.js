const Router = require("express");
const router = new Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.put("/:userId", authMiddleware, userController.edit);
router.put('/photo/:userId', authMiddleware, userController.addPhoto);
router.put('/photo/delete/:userId', authMiddleware, userController.deletePhoto);
router.get("/auth", authMiddleware, userController.check);
router.get("/", userController.getAllUsers);
router.get("/:userId", authMiddleware, userController.getUserById);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
