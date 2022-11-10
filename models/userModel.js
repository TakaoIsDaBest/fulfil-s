import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: [true, "Please enter a username."] },
		password: { type: String, required: [true, "Please enter a password."] },
		todos: { type: [{ type: String }], required: true, default: [] }
	},
	{ timestamps: true }
);

export default mongoose.model("User", userSchema);
