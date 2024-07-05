import express from "express";
import { getCurrentUser } from "../controllers/user";
import { authenticated } from "../middleware/authentication";

const router = express.Router();

router.get("/current", authenticated, getCurrentUser);

export default router;
