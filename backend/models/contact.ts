import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const contactSchema = new Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	contacts: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "User"
	}
});

type Contact = InferSchemaType<typeof contactSchema>;
export default model<Contact>("Contact", contactSchema);
