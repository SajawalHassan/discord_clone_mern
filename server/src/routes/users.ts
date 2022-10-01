import { Router } from "express";
import { getAllUsers, getCurrentUser } from "../controllers/users";

const router: Router = Router();

router.get("/me", getCurrentUser);
router.get("/all", getAllUsers);

export default router;
