import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		full_name: {
			type: String,
			required: true
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
		bio: {
			type: String,
			default: "This user currently does not have a bio written"
		},
		blocked_users: {
			type: [mongoose.Schema.Types.ObjectId],
			default: []
		},
		dm_count: {
			type: Number,
			default: 0
		}
	},
	{ timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);
