import { Request, Response } from "express";
import colors from "colors";
import Conversation from "../models/chat-related/conversation";

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

export { getAllConversations };
