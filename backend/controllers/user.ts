import { Request, Response } from "express";
import User from "../models/user";
import colors from "colors";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
});

const FOLDER_PATH = path.join(__dirname, "..", "./temp_images");

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

const uploadUserProfilePicture = async (req: Request, res: Response) => {
	const curr_uid: string = req.cookies.decoded_uid;
	fs.readdir(FOLDER_PATH, (err, files) => {
		files.forEach(async file => {
			const uploadedImagePath = path.resolve(
				__dirname,
				`../temp_images/${file}`
			);

			const uploadResult = await cloudinary.uploader
				.upload(uploadedImagePath, {
					public_id: `${curr_uid}-profile_picture`
				})
				.catch(error => {
					console.log(error);
				});

			try {
				if (uploadResult) {
					await User.findByIdAndUpdate(
						{ _id: curr_uid },
						{
							profile_picture: uploadResult.url
						}
					);

					fs.unlink(path.join(FOLDER_PATH, file), err => {
						if (err) throw err;
					});
				}
			} catch (error) {
				console.log(
					"<user.ts>".yellow.bold,
					(error as Error).toString().red.bold
				);
				res.status(500).json({ error });
			}
		});
	});
};

export { getCurrentUser, updateUserSettings, uploadUserProfilePicture };
