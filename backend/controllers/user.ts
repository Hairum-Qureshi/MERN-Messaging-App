import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
	const curr_uid: string = req.cookies.decoded_uid;
	try {
		const currUserData = await User.findById({ _id: curr_uid }).select(
			"-password -__v -createdAt -updatedAt"
		);
		res.status(201).json(currUserData);
	} catch (error) {
		console.log("<user.ts>".yellow.bold, (error as Error).toString().red.bold);
		res.status(500).json({ error });
	}
};

export { getCurrentUser };
