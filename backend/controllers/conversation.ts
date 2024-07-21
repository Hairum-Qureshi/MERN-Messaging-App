import { Request, Response } from "express";
import colors from "colors";
import Conversation from "../models/chat-related/conversation";
import mongoose from "mongoose";
import Message from "../models/chat-related/message";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
colors.enable();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
});

const FOLDER_PATH = path.join(__dirname, "..", "./temp_images");

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
				select: "_id full_name profile_picture biography status_update"
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
				select: "_id full_name profile_picture biography status_update"
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
	const curr_uid = req.cookies.decoded_uid;
	const { conversation_id } = req.params;
	const message: string[] | string = Array.isArray(req.body.message)
		? req.body.message[0]
		: req.body.message;
	const uploadedFiles: boolean =
		req.body.uploadedFiles === "true" ? true : false;

	if (uploadedFiles) {
		fs.readdir(FOLDER_PATH, async (err, files) => {
			if (err) {
				console.log(err);
				return res.status(500).send("Error reading files");
			}

			const attachments: string[] = [];

			for (const file of files) {
				const file_parts: string[] = file.split("-");
				if (file_parts[0] === conversation_id && file_parts[1] === curr_uid) {
					// Makes sure that only the current user's uploaded images for the specific conversation (by convo ID) are identified and don't get mixed up with any other uploaded files from other users/from different conversations
					const uploadedImagePath = path.resolve(
						__dirname,
						`../temp_images/${file}`
					);

					try {
						const uploadResult = await cloudinary.uploader.upload(
							uploadedImagePath,
							{
								public_id: file
							}
						);

						if (uploadResult) {
							attachments.push(uploadResult.url);
						}

						// Delete the uploaded images from the 'temp_images' folder
						fs.unlink(path.join(FOLDER_PATH, file), err => {
							if (err) {
								return console.log(
									"<conversation.ts> controller".yellow.bold,
									(err as Error).toString().red.bold
								);
							}
						});

						if (err) throw err;
					} catch (error) {
						console.log(error);
					}
				}
			}

			if (attachments.length > 0) {
				try {
					const createdMessage = await Message.create(
						{
							sender: curr_uid,
							conversation_ID: conversation_id,
							content: message[0] || message,
							attachments: attachments
						},
						{
							new: true
						}
					);

					const getCreatedMessage = await Message.findById({
						_id: createdMessage[0]._id
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
					return res.status(500).send("Error creating message");
				}
			} else {
				return res.status(400).send("No valid attachments found");
			}
		});
	} else {
		const createdMessage = await Message.create(
			{
				sender: curr_uid,
				conversation_ID: conversation_id,
				content: message
			},
			{
				new: true
			}
		);

		const getCreatedMessage = await Message.findById({
			_id: createdMessage[0]._id
		})
			.populate({
				path: "sender",
				select: "_id full_name profile_picture"
			})
			.select("-__v -updatedAt");
		res.status(201).json(getCreatedMessage);
	}
}

export {
	getAllConversations,
	getConversation,
	getMedia,
	getConversationMessages,
	sendMessage
};
