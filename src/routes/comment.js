import express from "express";

import { addComment, deleteComment } from "../controllers/comment";
import { validateComment } from "../middleware/validators";

const router = new express.Router();

router.post("/posts/:postId/comment", validateComment, addComment);
router.delete("/posts/:postId/comment/:commentId", deleteComment);

export default router;
