import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    content: { type: String, required: true },
    post: { type: mongoose.SchemaTypes.ObjectId, ref: "Post" },
  },

  { timestamps: { createdAt: "created_at" } }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
