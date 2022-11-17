import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		username: { type: String, required: [true, "Please enter a username."] },
		password: { type: String, required: [true, "Please enter a password."] },
		todos: {
			type: [
				{
					_id: mongoose.Types.ObjectId,
					title: String,
					main: String,
					tags: [{ type: String }],
					color: String,
					updatedAt: { type: Date, default: Date.now }
				}
			],
			required: true,
			default: []
		}
	},
	{ timestamps: true }
);

export default mongoose.model("User", userSchema);
