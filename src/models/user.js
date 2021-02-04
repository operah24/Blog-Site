import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    {
      timestamps: { currentTime: () => Date.now() },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
