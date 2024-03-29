import mongoose from "mongoose";
import User from "./user";
import Post from "./post";
import Comment from "./comment";
const connectDatabase = async () => {
  const url = process.env.MY_DATABASE_URL;
  try {
    return mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => console.log("connected to database"));
  } catch (error) {
    console.log(error);
  }
};

export { connectDatabase, User, Post, Comment };
