import {
  registerBodySchema,
  loginBodySchema,
  postSchema,
  commentSchema,
} from "../utils/validatorSchema";

const validateRegister = (req, res, next) => {
  const { error } = registerBodySchema(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  return next();
};
const validateLogin = (req, res, next) => {
  const { error } = loginBodySchema(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  return next();
};
const validatePost = (req, res, next) => {
  const { error } = postSchema(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  return next();
};
const validateComment = (req, res, next) => {
  const { error } = commentSchema(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }
};
export {
  validateRegister,
  validateLogin,
  validatePost,
  validateComment,
};
