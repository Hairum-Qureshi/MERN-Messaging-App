import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const mediaSchema = new Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		conversation_ID: {
			type: String,
			ref: "Conversation"
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
