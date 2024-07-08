import express from "express";
import { getAllConversations } from "../controllers/conversation";
import { authenticated } from "../middleware/authentication";

const router = express.Router();

router.get("/all", authenticated, getAllConversations);

export default router;
