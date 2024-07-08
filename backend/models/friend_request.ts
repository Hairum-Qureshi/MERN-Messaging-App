import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const friendRequestSchema = new Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
);

type FriendRequest = InferSchemaType<typeof friendRequestSchema>;
export default model<FriendRequest>("FriendRequest", friendRequestSchema);
