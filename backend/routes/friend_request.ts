import express from "express";
import {
	sendFriendRequest,
	getFriendRequests,
	getAllPendingFriendRequests
} from "../controllers/friend_request";
import { authenticated } from "../middleware/authentication";

const router = express.Router();

router.post("/send", authenticated, sendFriendRequest);

router.get("/all", authenticated, getFriendRequests);

router.get("/all-sent", authenticated, getAllPendingFriendRequests);

export default router;
