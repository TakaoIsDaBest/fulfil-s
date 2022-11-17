import express from "express";

import { registerUser, loginUser } from "../controllers/userController.js";
import { createTodo } from "../controllers/todoController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// User
router.post("/register", registerUser);
router.post("/login", loginUser);

// Todos
router.post("/:username/todos/create", protect, createTodo);
//router.get("/:username/todos", protect, getTodos);

export default router;
