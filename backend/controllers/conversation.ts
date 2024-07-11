import { Request, Response } from "express";
import colors from "colors";
import Conversation from "../models/chat-related/conversation";
import mongoose from "mongoose";
import Message from "../models/chat-related/message";

colors.enable();

async function getAllConversations(req: Request, res: Response) {
	try {
		const curr_uid: string = req.cookies.decoded_uid;

		await Conversation.find({
			members: {
				$in: [curr_uid]
			}
		})
			.populate({
				path: "members",
				select: "full_name profile_picture biography _id status_update"
			})
			.select("-createdAt -updatedAt -__v")
			.then(allConversations => {
				res.status(201).json(allConversations);
			})
			.catch(error => {
				console.log("<conversation.ts> controller".yellow.bold, error.red.bold);
			});
	} catch (error) {
		console.log(
			"<conversation.ts> controller".yellow.bold,
			(error as Error).toString().red.bold
		);
	}
}

async function getConversation(req: Request, res: Response) {
	const { conversation_id } = req.params;
	try {
		if (!mongoose.isValidObjectId(conversation_id)) {
			return res.status(400).json({ message: "Invalid user ID" });
		}

		const conversation = await Conversation.findById({ _id: conversation_id })
			.populate({
				path: "members",
				select: "_id full_name profile_picture"
			})
			.select("-__v");
		res.status(201).json(conversation);
	} catch (error) {
		console.log(
			"<conversation.ts> controller".yellow.bold,
			(error as Error).toString().red.bold
		);
	}
}

async function getMedia(req: Request, res: Response) {}

async function getConversationMessages(req: Request, res: Response) {
	const { conversation_id } = req.params;
	try {
		const messages = await Message.find({
			conversation_ID: conversation_id
		})
			.populate({
				path: "sender",
				select: "_id full_name profile_picture"
			})
			.select("-__v -updatedAt");
		res.status(201).json(messages);
	} catch (error) {
		console.log(
			"<conversation.ts> controller".yellow.bold,
			(error as Error).toString().red.bold
		);
	}
}

async function sendMessage(req: Request, res: Response) {
	const { message } = req.body;
	const { conversation_id } = req.params;
	try {
		const curr_uid: string = req.cookies.decoded_uid;
		const createdMessage = await Message.create({
			sender: curr_uid,
			conversation_ID: conversation_id,
			content: message
		});

		const getCreatedMessage = await Message.findById({
			_id: createdMessage._id
		})
			.populate({
				path: "sender",
				select: "_id full_name profile_picture"
			})
			.select("-__v -updatedAt");

		res.status(201).json(getCreatedMessage);
	} catch (error) {
		console.log(
			"<conversation.ts> controller".yellow.bold,
			(error as Error).toString().red.bold
		);
	}
}

export {
	getAllConversations,
	getConversation,
	getMedia,
	getConversationMessages,
	sendMessage
};
