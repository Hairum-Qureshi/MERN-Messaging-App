import express from "express";
import { getCurrentUser, updateUserSettings } from "../controllers/user";
import { authenticated } from "../middleware/authentication";

const router = express.Router();

router.get("/current", authenticated, getCurrentUser);

router.patch("/settings", authenticated, updateUserSettings);

export default router;
