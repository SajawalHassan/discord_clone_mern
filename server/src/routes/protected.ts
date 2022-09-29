import { Router } from "express";
import { protectedRoute } from "../controllers/protected";

const router: Router = Router();

router.get("/", protectedRoute);

export default router;
