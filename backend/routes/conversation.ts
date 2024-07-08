import express from "express";
import { getAllConversations } from "../controllers/conversation";

const router = express.Router();

router.get("/all", getAllConversations);

export default router;
