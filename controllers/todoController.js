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

	const user = await User.findOneAndUpdate(
		{ username: req.params.username },
		{ $push: { todos: { $each: [todo], $position: 0 } } },
		{ new: true }
	);
	if (!user) {
		res.status(400);
		throw new Error("Sorry. Something went wrong.");
	}

	res.status(200).json(user.todos);
});

// @desc    Get user todos
// @route   GET /api/users/:username/todos
// @access  Private
export const getUserTodos = asyncHandler(async (req, res) => {
	if (!req.params.username) {
		res.status(400);
		throw new Error("Sorry. Something went wrong.");
	}

	const user = await User.findOne({ username: req.params.username }, "todos");

	const todos = user.todos.slice(req.body.start, req.body.start + 10);

	res.status(200).json({ todos, more: req.body.start + 1 <= user.todos.length });
});

// @desc    Edit a todo
// @route   PATCH /api/users/:username/todos/:todoId
// @access  Private
export const editTodo = asyncHandler(async (req, res) => {
	const { username, todoId } = req.params;

	if (!username || !todoId) {
		res.status(400);
		throw new Error("Sorry. Something went wrong.");
	}

	const user = await User.findOneAndUpdate(
		{ username: username, "todos._id": todoId },
		{
			$set: {
				"todos.$.title": req.body.title,
				"todos.$.main": req.body.main,
				"todos.$.tags": req.body.tags,
				"todos.$.color": req.body.color
			}
		},
		{ new: true }
	);

	const todos = user.todos.slice(0, 10);

	res.status(200).json(todos);
});

// @desc    Delete a todo
// @route   DELETE /api/users/:username/todos/:todoId
// @access  Private
export const deleteTodo = asyncHandler(async (req, res) => {
	const { username, todoId } = req.params;

	if (!username || !todoId) {
		res.status(400);
		throw new Error("Sorry. Something went wrong.");
	}

	const user = await User.findOneAndUpdate(
		{ username: username },
		{ $pull: { todos: { _id: todoId } } },
		{ new: true }
	);
	const todos = user.todos.slice(0, 10);

	res.status(200).json(todos);
});
