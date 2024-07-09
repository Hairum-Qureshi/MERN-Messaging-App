import express from "express";
import {
	getAllConversations,
	getConversation,
	getMedia
} from "../controllers/conversation";
import { authenticated } from "../middleware/authentication";

const router = express.Router();

router.get("/all", authenticated, getAllConversations);

router.get("/:conversation_id", authenticated, getConversation);

router.get("/:conversation_id/get-media", authenticated, getMedia);

export default router;
