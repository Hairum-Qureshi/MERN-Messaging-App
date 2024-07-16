import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const messageSchema = new Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		conversation_ID: {
			type: String,
			ref: "Conversation"
		},
		content: {
			type: String,
			trim: true
		},
		attachments: {
			type: [String],
			default: []
		}
	},
	{
		timestamps: true
	}
);

type Message = InferSchemaType<typeof messageSchema>;
export default model<Message>("Message", messageSchema);
