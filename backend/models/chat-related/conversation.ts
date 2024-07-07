import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const conversationSchema = new Schema(
	{
		groupChatName: {
			type: String,
			trim: true
		},
		isGroupChat: {
			type: Boolean,
			default: false
		},
		members: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User"
		},
		recipient: {
			type: mongoose.Schema.Types.ObjectId
		},
		latestMessage: {
			type: String,
			ref: "Message",
			default: ""
		},
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		groupChatPhoto: {
			type: String,
			default: "https://www.tenniscall.com/images/chat.jpg",
			required: true
		}
	},
	{
		timestamps: true
	}
);

type Conversation = InferSchemaType<typeof conversationSchema>;
export default model<Conversation>("Conversation", conversationSchema);
