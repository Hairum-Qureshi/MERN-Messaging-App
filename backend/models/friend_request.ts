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
		},
		accepted: {
			type: Boolean,
			default: false
		},
		rejected: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

type FriendRequest = InferSchemaType<typeof friendRequestSchema>;
export default model<FriendRequest>("Friend_Request", friendRequestSchema);
