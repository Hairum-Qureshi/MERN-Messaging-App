import express from "express";
import {
	sendFriendRequest,
	getFriendRequests,
	getAllPendingFriendRequests,
	acceptFriendRequest
} from "../controllers/friend_request";
import { authenticated } from "../middleware/authentication";

const router = express.Router();

router.post("/send", authenticated, sendFriendRequest);

router.get("/all", authenticated, getFriendRequests);

router.get("/all-sent", authenticated, getAllPendingFriendRequests);

router.post("/accept", authenticated, acceptFriendRequest);

export default router;
