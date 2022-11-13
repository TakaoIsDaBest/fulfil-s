import express from "express";

import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
//router.get("/username", protect, changeUsername);
//router.get("/password", protect, changePasssword);

export default router;
