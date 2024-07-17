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

router.get("/:conversation_id/messages", getConversationMessages);

router.post(
	"/:conversation_id/send-message",
	authenticated,
	upload.array("message-attachments"),
	sendMessage
);

router.get("/:conversation_id/get-media", authenticated, getMedia);

export default router;
