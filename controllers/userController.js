import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { name, password } = req.body;

	if (!name || !password) {
		res.status(400);
		throw new Error("Please fill all fields");
	}

	// Check if user exists
	const userExists = await User.findOne({ name });
	console.log(userExists);
	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({ name, password: hashedPassword });

	if (user) {
		res.status(201).json({ _id: user.id, name: user.name, token: generateToken(user._id) });
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}

	res.status(200).json({ message: `${user.name}` });
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
