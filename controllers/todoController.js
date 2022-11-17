import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";

// @desc    Create new todo
// @route   POST /api/users/:username/todos/create
// @access  Private
export const createTodo = asyncHandler(async (req, res) => {
	if (!req.body) {
		res.status(400);
		throw new Error("Sorry. Something went wrong.");
	}

	const todo = { ...req.body, tags: req.body.tags.split(" ") };

	const user = await User.findOneAndUpdate({ username: req.params.username }, { $push: { todos: todo } });
	if (!user) {
		res.status(400);
		throw new Error("Sorry. Something went wrong.");
	}

	res.status(200).json(user.todos);
});
