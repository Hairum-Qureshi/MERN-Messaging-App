import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth_router from "./routes/authentication";

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

const PORT: string | number = process.env.PORT! || 3000;

app.use('/api/auth', auth_router);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`.magenta.bold);
});
