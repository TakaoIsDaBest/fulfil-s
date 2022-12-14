import express from "express";

import { registerUser, loginUser } from "../controllers/userController.js";
import { createTodo, getUserTodos, editTodo, deleteTodo } from "../controllers/todoController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// User
router.post("/register", registerUser);
router.post("/login", loginUser);

// Todos
router.post("/:username/todos/create", protect, createTodo);
router.post("/:username/todos", protect, getUserTodos);
router.patch("/:username/todos/:todoId", protect, editTodo);
router.delete("/:username/todos/:todoId", protect, deleteTodo);

export default router;
