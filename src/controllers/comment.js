import { Comment, Post } from "../models";

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;

    const { author, content } = req.body;
    const comment = new Comment({
      author: author,
      content: content,
    });
    await comment.save();
    await Post.findByIdAndUpdate(
      { _id: postId },
      {
        $addToSet: { comment },
      },
      { useFindAndModify: false }
    );
    return res.status(201).json({
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error",
      error: error,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      message: "Successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "error",
      error: error,
    });
  }
};
export { addComment, deleteComment };
