import express from "express";
import isUser from "../middleware/isUser";
import {
  addPost,
  deletePost,
  editPost,
  getPosts,
  getPostsById,
} from "../controllers/post";

const router = new express.Router();

router.post("/posts", isUser, addPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostsById);
router.patch("/posts/:id", isUser, editPost);
router.delete("/posts/:id", isUser, deletePost);

export default router;
