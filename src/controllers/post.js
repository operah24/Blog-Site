import { Post, User } from "../models";

const addPost = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const { title, body } = req.body;
    const post = new Post({
      title: title,
      body: body,
      author: userId,
    });
    await post.save();
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $addToSet: { posts: post._id },
      },
      { useFindAndModify: false }
    );
    return res.status(201).json({
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");
    return res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};

const getPostsById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name"
    );
    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }
    return res.status(200).json({
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};

const editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }
    post.title = req.body.title;
    post.body = req.body.body;

    await post.save();
    return res.status(200).json({
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $addToSet: { posts: post._id },
      },
      { useFindAndModify: false }
    );
    return res.status(200).json({
      message: "Successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};

export { addPost, getPosts, getPostsById, editPost, deletePost };
