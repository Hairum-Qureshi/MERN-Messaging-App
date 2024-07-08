import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const dmRequestConversationSchema = new Schema(
	{
		members: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User"
		},
		latestMessage: {
			type: String,
			ref: "Message",
			default: ""
		}
	},
	{
		timestamps: true
	}
);

type DMRequestConversation = InferSchemaType<
	typeof dmRequestConversationSchema
>;
export default model<DMRequestConversation>(
	"DMRequestConversation",
	dmRequestConversationSchema
);
