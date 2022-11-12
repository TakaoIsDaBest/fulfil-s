import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { username, password, confirmPassword } = req.body;

	if (!username) {
		res.status(400);
		throw new Error("Please enter a username", { cause: "username" });
	}

	if (!password) {
		res.status(400);
		throw new Error("Please enter a password", { cause: "password" });
	}

	if (password.length < 8) {
		res.status(400);
		throw new Error("Password must have more than 8 characters", { cause: "password" });
	}

	if (!confirmPassword) {
		res.status(400);
		throw new Error("Please enter your password again", { cause: "confirm" });
	}

	if (confirmPassword !== password) {
		res.status(400);
		throw new Error("Passwords do not match", { cause: "confirm" });
	}

	// Check if user exists
	const userExists = await User.findOne({ username });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists", { cause: "username" });
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({ username, password: hashedPassword });

	if (user) {
		res.status(201).json({ _id: user.id, username: user.username, token: generateToken(user._id) });
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}

	res.status(200).json({ message: "User register" });
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
