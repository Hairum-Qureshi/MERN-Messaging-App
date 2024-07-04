import { Request, Response } from "express";
import bcrypt from "bcrypt";
import colors from "colors";
import User from "../models/user";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
colors.enable();

function createCookie(user_id: mongoose.Types.ObjectId, res: Response) {
	const payload = {
		user_id
	};
	const secretKey: string = process.env.JWT_SECRET!;
	const token = jwt.sign(payload, secretKey, { expiresIn: "3d" });
	res.cookie("auth-session", token, { httpOnly: true, maxAge: 259200000 }); // 3 days in milliseconds
}

const sign_up = async (req: Request, res: Response) => {
	const { first_name, last_name, email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		} else {
			const salt = await bcrypt.genSalt(10);
			const hashed_password = await bcrypt.hash(password, salt);
			await User.create({
				full_name: `${first_name.replace(
					first_name[0],
					first_name[0].toUpperCase()
				)} ${last_name.replace(last_name[0], last_name[0].toUpperCase())}`,
				email: email.toLowerCase(),
				password: hashed_password
			})
				.then(created_user => {
					// console.log(response);
					if (created_user._id) {
						createCookie(created_user._id, res);
						return res
							.status(201)
							.json({ message: "User created successfully" });
					}
				})
				.catch((error: Error) => {
					console.log(
						"<authentication.ts>".yellow.bold,
						"error".red.bold,
						error.toString().red.bold
					);
					return res.status(500).json(error);
				});
		}
	} catch (error) {
		console.log(
			"<authentication.ts>".yellow.bold,
			"error".red.bold,
			(error as Error).toString().red.bold
		);
	}
};

const sign_in = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (isPasswordValid) {
				createCookie(user._id, res);
				return res.status(200).json({ message: "User signed in successfully" });
			} else {
				return res.status(401).json({ message: "Invalid credentials" });
			}
		} else {
			return res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		console.log(
			"<authentication.ts>".yellow.bold,
			"error".red.bold,
			(error as Error).toString().red.bold
		);
	}
};

export { sign_up, sign_in };
