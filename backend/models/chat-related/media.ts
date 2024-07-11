import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const mediaSchema = new Schema(
	{
		conversation_ID: {
			type: String,
			ref: "Conversation"
		},
		message_ID: {
			type: String,
			ref: "Message"
		},
		images_data: {
			type: [String]
		}
	},
	{
		timestamps: true
	}
);

type Media = InferSchemaType<typeof mediaSchema>;
export default model<Media>("Media", mediaSchema);
