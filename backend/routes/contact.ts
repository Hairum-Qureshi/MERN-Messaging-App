import express from "express";
import { sendFriendRequest, getContacts } from "../controllers/contact";
import { authenticated } from "../middleware/authentication";

const router = express.Router();

router.post("/send-friend-request", authenticated, sendFriendRequest);

router.get("/all", authenticated, getContacts);

export default router;
