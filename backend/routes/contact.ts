import express from "express";
import { sendFriendRequest, getFriendRequests } from "../controllers/contact";
import { authenticated } from "../middleware/authentication";

const router = express.Router();

router.post("/send-friend-request", authenticated, sendFriendRequest);

router.get("/all-friend-requests", authenticated, getFriendRequests);

export default router;
