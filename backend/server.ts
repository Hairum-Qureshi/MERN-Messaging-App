import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth_router from "./routes/authentication";
import mongoose from "mongoose";
import user_router from "./routes/user";
import contact_router from "./routes/contact";

dotenv.config();
colors.enable();

const app = express();

const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", auth_router);
app.use("/api/user", user_router);
app.use("/api/contacts", contact_router);

const PORT: string | number = process.env.PORT! || 3000;
const MONGO_URI: string = process.env.MONGO_URI!;

mongoose
	.connect(MONGO_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`Successfully connected to MongoDB! Server listening on port ${PORT}`
					.magenta.bold
			);
		});
	})
	.catch(err => {
		console.log(err);
	});
