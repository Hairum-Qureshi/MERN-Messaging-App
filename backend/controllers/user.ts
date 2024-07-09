import { Request, Response } from "express";
import User from "../models/user";
import colors from "colors";

colors.enable();

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

const updateUserSettings = async (req: Request, res: Response) => {
	const { newFirstName, newLastName, statusUpdate, userBio } = req.body;
	try {
		const curr_uid: string = req.cookies.decoded_uid;
		const updatedData = await User.findByIdAndUpdate(
			{ _id: curr_uid },
			{
				full_name: `${newFirstName} ${newLastName}`,
				status_update: statusUpdate,
				biography: userBio || "This user currently does not have a bio written"
			},
			{
				new: true
			}
		);
		res.status(200).json(updatedData);
	} catch (error) {
		console.log("<user.ts>".yellow.bold, (error as Error).toString().red.bold);
		res.status(500).json({ error });
	}
};

export { getCurrentUser, updateUserSettings };
