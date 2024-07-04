import express from "express";
import { sign_up } from "../controllers/authentication";

const router = express.Router();

router.post("/sign-up", sign_up);

export default router;