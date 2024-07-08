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

		if (mongoose.isValidObjectId(user_id)) {
			if (user_id === curr_uid) {
				return res.status(400).json({
					message: "You cannot add yourself as a friend!"
				});
			}
		} else {
			const findUserByUID = await User.findById({ _id: user_id });
			if (findUserByUID) {
				const findFriend = await User.findOne({
					_id: curr_uid,
					friends: { $elemMatch: { $eq: user_id } }
				});

				if (findFriend) {
					return res.status(400).json({
						message: "You already have this user as a friend"
					});
				} else {
					const findPendingRequest = await FriendRequest.findOne({
						$and: [{ sender: curr_uid }, { receiver: user_id }]
					});

					if (findPendingRequest) {
						return res.status(400).json({
							message:
								"You already have a pending friend request with this user"
						});
					} else {
						console.log("Friend request created!".yellow);
						await FriendRequest.create({
							sender: curr_uid,
							receiver: user_id
						})
							.then(() => {
								return res.status(200).json({
									message: "Friend request sent!"
								});
							})
							.catch(error => {
								console.log("<contact.ts> controller", error.red.bold);
								return res.status(500).json(error);
							});
					}
				}
			} else {
				return res.status(404).json({
					message: "User not found!"
				});
			}
		}
	} catch (error) {
		console.log(
			"<contact.ts> controller".yellow.bold,
			(error as Error).toString().red.bold
		);
	}
};

const getFriendRequests = async (req: Request, res: Response) => {
	try {
		const curr_uid: string = req.cookies.decoded_uid;
	} catch (error) {
		console.log(
			"<contact.ts> controller".yellow.bold,
			(error as Error).toString().red.bold
		);
	}
};

const getAllPendingFriendRequests = async (req: Request, res: Response) => {};

export { sendFriendRequest, getFriendRequests, getAllPendingFriendRequests };
