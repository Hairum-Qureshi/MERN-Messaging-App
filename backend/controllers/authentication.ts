import { Request, Response } from "express";
import bcrypt from "bcrypt";
import colors from "colors";
import User from "../models/user";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
colors.enable();

function createToken(user_id: mongoose.Types.ObjectId): string {
	try {
		const payload = {
			user_id
		};

		const secretKey: string = process.env.JWT_SECRET!;
		const token: string = jwt.sign(payload, secretKey, { expiresIn: "3d" });

		return token;
	} catch (error) {
		console.log("Error creating token:".red.bold, error);
		throw new Error("Error creating token");
	}
}

const sign_up = async (req: Request, res: Response) => {
	const { first_name, last_name, email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashed_password = await bcrypt.hash(password, salt);
		const full_name = `${
			first_name.charAt(0).toUpperCase() + first_name.slice(1)
		} ${last_name.charAt(0).toUpperCase() + last_name.slice(1)}`;
		const newUser = await User.create({
			full_name,
			email: email.toLowerCase(),
			password: hashed_password
		});

		const token = createToken(newUser._id);
		res
			.status(201)
			.cookie("auth-session", token, {
				httpOnly: true,
				maxAge: 259200000 // 3 days in milliseconds
			})
			.json({ message: "User created successfully" });
	} catch (error) {
		console.log(
			"<authentication.ts> controller".yellow.bold,
			(error as Error).toString().red.bold
		);
		res.status(500).json({ message: "Internal server error" });
	}
};

const sign_in = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = createToken(user._id);
		res
			.status(201)
			.cookie("auth-session", token, { httpOnly: true, maxAge: 259200000 }) // 3 days in milliseconds
			.json({ message: "Signed in successfully" });
	} catch (error) {
		console.log(
			"<authentication.ts> controller".yellow.bold,
			"error".red.bold,
			(error as Error).toString().red.bold
		);
		res.status(500).json({ message: "Internal server error" });
	}
};

export { sign_up, sign_in };
