import { Router } from "express";
import { registerUser, loginUser, refreshToken } from "../controllers/auth";

const router: Router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", refreshToken);

export default router;
