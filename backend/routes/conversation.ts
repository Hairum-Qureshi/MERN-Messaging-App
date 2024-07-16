import express from "express";
import {
	getAllConversations,
	getConversation,
	getConversationMessages,
	getMedia,
	sendMessage
} from "../controllers/conversation";
import { authenticated } from "../middleware/authentication";
import upload from "../upload";

const router = express.Router();

router.get("/all", authenticated, getAllConversations);

router.get("/:conversation_id", authenticated, getConversation);

router.get(
	"/:conversation_id/messages",
	upload.single("message-attachments"),
	getConversationMessages
);

router.post("/:conversation_id/send-message", authenticated, sendMessage);

router.get("/:conversation_id/get-media", authenticated, getMedia);

export default router;
