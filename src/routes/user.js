import express from "express";
import isUser from "../middleware/isUser";
import { getUser, registerUser, login } from "../controllers";

import {
  validateLogin,
  validateRegister,
} from "../middleware/validators";
const router = new express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, login);
router.get("/me", isUser, getUser);
router.get("/opeyemi", isUser, getUser);

export default router;
