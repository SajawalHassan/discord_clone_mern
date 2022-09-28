import { Router } from "express";
import { registerUser } from "../controllers/auth";

const router: Router = Router();

router.post("/create", registerUser);

export default router;
