import express from "express";
import {
	getCurrentUser,
	updateUserSettings,
	uploadUserProfilePicture
} from "../controllers/user";
import { authenticated } from "../middleware/authentication";
import upload from "../upload";

const router = express.Router();

router.get("/current", authenticated, getCurrentUser);

router.patch("/settings", authenticated, updateUserSettings);

router.post(
	"/upload",
	authenticated,
	upload.single("profile_picture"),
	uploadUserProfilePicture
);

export default router;
