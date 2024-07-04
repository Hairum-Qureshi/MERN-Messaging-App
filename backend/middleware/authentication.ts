import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import colors from "colors";

colors.enable();
dotenv.config();

const authenticated = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies["auth-session"];
	const secret: string = process.env.JWT_SECRET!;
	if (token) {
		jwt.verify(
			token,
			secret,
			(err: Error | null, decoded: string | jwt.JwtPayload | undefined) => {
				if (err) {
					console.log("<authentication.ts> middleware".yellow.bold, err);
					return res.status(401).json({ message: "Invalid token" });
				} else {
					console.log(decoded);
					next();
				}
			}
		);
	} else {
		res.status(401).json({ message: "Unauthorized" });
	}
};

export { authenticated };
