import { verify } from "jsonwebtoken";
import { User } from "../models";

const isUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Access denied, no token!",
    });
  }

  try {
    const { id } = verify(token, "ESTHER");
    const user = await User.findById(id);
    if (user) {
      req.user = user;
      return next();
    }
    return res.status(404).json({
      status: "error",
      message: "Sorry User not found!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "invalid token",
    });
  }
};

export default isUser;
