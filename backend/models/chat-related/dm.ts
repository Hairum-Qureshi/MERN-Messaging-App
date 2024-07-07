import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const dmSchema = new Schema(
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
		declined: {
			type: Boolean,
			default: false
		},
		message: {
			type: String,
			ref: "Message"
		}
		// conversation_ID: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "Conversation"
		// }
	},
	{
		timestamps: true
	}
);

type DM = InferSchemaType<typeof dmSchema>;
export default model<DM>("DM", dmSchema);
