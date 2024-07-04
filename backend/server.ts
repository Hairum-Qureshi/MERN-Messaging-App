import express from "express";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();
colors.enable();

const app = express();
const PORT: string | number = process.env.PORT! || 3000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`.magenta.bold);
});
