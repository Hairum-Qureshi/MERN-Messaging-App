import { Request, Response } from "express";
import User from "../models/user";
import mongoose from "mongoose";
import colors from "colors";
import FriendRequest from "../models/friend_request";

colors.enable();

const sendFriendRequest = async (req: Request, res: Response) => {
	const { user_id } = req.body;
	try {
		const curr_uid: string = req.cookies.decoded_uid;

		// Check if user_id is a valid ObjectId
		if (!mongoose.isValidObjectId(user_id)) {
			console.log("Invalid user ID");
			return res.status(400).json({ message: "Invalid user ID" });
		}

		// Check if the user is trying to add themselves
		if (user_id === curr_uid) {
			console.log("You cannot add yourself as a friend");
			return res
				.status(400)
				.json({ message: "You cannot add yourself as a friend!" });
		}

		const findUserByUID = await User.findById(user_id);
		if (!findUserByUID) {
			console.log("User not found");
			return res.status(404).json({ message: "User not found!" });
		}

		console.log("User found. Proceeding");

		// Check if the current user already has this user as a friend
		const findFriend = await User.findOne({
			_id: curr_uid,
			friends: { $elemMatch: { $eq: user_id } }
		});

		if (findFriend) {
			console.log("You already have this user as a friend");
			return res
				.status(400)
				.json({ message: "You already have this user as a friend" });
		}

		// Check if there is already a pending friend request
		const findPendingRequest = await FriendRequest.findOne({
			sender: curr_uid,
			receiver: user_id
		});

		if (findPendingRequest) {
			console.log("You already have a pending friend request with this user");
			return res.status(400).json({
				message: "You already have a pending friend request with this user"
			});
		}

		// Create the friend request
		const createdFriendRequest = await FriendRequest.create({
			sender: curr_uid,
			receiver: user_id
		});

		console.log("Friend request created!");
		return res.status(200).json(createdFriendRequest);
	} catch (error) {
		console.log("<friend_request.ts> controller", (error as Error).toString());
		return res
			.status(500)
			.json({ message: "Server error", error: (error as Error).toString() });
	}
};

const getFriendRequests = async (req: Request, res: Response) => {
	try {
		const curr_uid: string = req.cookies.decoded_uid;
		const pendingFR = await FriendRequest.find({
			receiver: curr_uid
		})
			.populate({
				path: "sender",
				select: "_id full_name profile_picture status_update"
			})
			.select("sender");
		return res.status(200).json(pendingFR);
	} catch (error) {
		console.log(
			"<friend_request.ts> controller".yellow.bold,
			(error as Error).toString().red.bold
		);
	}
};

const getAllPendingFriendRequests = async (req: Request, res: Response) => {
	try {
		const curr_uid: string = req.cookies.decoded_uid;

		const pendingRequests = await FriendRequest.find({
			sender: curr_uid,
			accepted: false,
			rejected: false
		})
			.populate({
				path: "receiver",
				select: "_id full_name profile_picture status_update"
			})
			.select("receiver");

		if (pendingRequests && pendingRequests.length > 0) {
			return res.status(200).json(pendingRequests);
		} else {
			return res.status(404).json({
				message: "No pending friend requests found"
			});
		}
	} catch (error) {
		console.log(
			"<friend_request.ts> controller".yellow.bold,
			(error as Error).toString().red.bold
		);
	}
};

export { sendFriendRequest, getFriendRequests, getAllPendingFriendRequests };
