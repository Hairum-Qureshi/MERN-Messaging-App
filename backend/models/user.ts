import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		full_name: {
			type: String,
			required: true
		},
		profile_picture: {
			type: String,
			default:
				"https://i.pinimg.com/originals/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		status_update: {
			type: String
		},
		biography: {
			type: String,
			default: "This user currently does not have a bio written",
			trim: true
		},
		blocked_users: {
			type: [mongoose.Schema.Types.ObjectId],
			default: []
		}
	},
	{ timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);
