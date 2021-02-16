import Joi from "joi";

const registerBodySchema = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
  });

  return schema.validate(user);
};

const loginBodySchema = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
  });

  return schema.validate(user);
};

const postSchema = (user) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
  });
  return schema.validate(user);
};

const commentSchema = (post) => {
  const schema = Joi.object({
    content: Joi.string().required(),
    author: Joi.string().required(),
  });
  return schema.validate(post);
};

export {
  registerBodySchema,
  loginBodySchema,
  postSchema,
  commentSchema,
};
