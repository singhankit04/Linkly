import { Router } from "express";
import { signup, login, logout, accesstoken } from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/refresh", accesstoken)

export default router;