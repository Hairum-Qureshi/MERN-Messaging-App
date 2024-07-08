import { Request, Response } from "express";
import User from "../models/user";
import mongoose from "mongoose";
import colors from "colors";
import Conversation from "../models/chat-related/conversation";

colors.enable();

const sendFriendRequest = async (req: Request, res: Response) => {
	const { user_id } = req.body;
	// try {
	// const curr_uid: string = req.cookies.decoded_uid;

	// 	if (mongoose.isValidObjectId(user_id)) {
	// 		if (user_id === curr_uid) {
	// 			return res
	// 				.status(400)
	// 				.json({ message: "You can't add yourself as a contact" });
	// 		} else {
	// 			const findUserByUID = await User.findById({ _id: user_id });
	// 			if (findUserByUID) {
	// 				// Check if the current user already has a contact with this specific user
	// const checkHasContact = await Contact.find({
	// 	user_id: curr_uid,
	// 	contacts: {
	// 		$in: [user_id]
	// 	}
	// });
	// 				if (checkHasContact.length > 0) {
	// 					return res
	// 						.status(400)
	// 						.json({ message: "You already have a contact with this user" });
	// 				} else {
	// 					// Add the user ID to the current user's contact 'contacts' array
	// 					const updatedContact = await Contact.findOneAndUpdate(
	// 						{ user_id: curr_uid },
	// 						{
	// 							$push: {
	// 								contacts: user_id
	// 							}
	// 						},
	// 						{ new: true }
	// 					)
	// 						.populate({
	// 							path: "contacts",
	// 							select: "-password -__v"
	// 						})
	// 						.select("-_id contacts");
	// 					return res.status(200).json([updatedContact]);
	// 				}
	// 			} else {
	// 				res
	// 					.status(404)
	// 					.json({ message: `User not found with ID: ${user_id}` });
	// 			}
	// 		}
	// 	} else {
	// 		res.status(400).json({ message: "Invalid user ID" });
	// 	}
	// } catch (error) {
	// 	console.log(
	// 		"<contact.ts> controller".yellow.bold,
	// 		(error as Error).toString().red.bold
	// 	);
	// }
};

const getContacts = async (req: Request, res: Response) => {
	// const curr_uid: string = req.cookies.decoded_uid;
	// try {
	// 	const contacts = await Contact.find({ user_id: curr_uid })
	// 		.populate({
	// 			path: "contacts",
	// 			select: "-password -__v"
	// 		})
	// 		.select("-_id contacts");
	// 	return res.status(200).json(contacts);
	// } catch (error) {
	// 	console.log(
	// 		"<contact.ts> controller".yellow.bold,
	// 		(error as Error).toString().red.bold
	// 	);
	// }
};

export { sendFriendRequest, getContacts };
