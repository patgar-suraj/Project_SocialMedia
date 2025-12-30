const express = require("express");
const router = express.Router();
const {registerController, loginController, logoutController, checkAuthController} = require("../controller/auth.controller")
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", authMiddleware, checkAuthController);

module.exports = router;
