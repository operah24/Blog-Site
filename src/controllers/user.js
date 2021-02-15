import { User } from "../models";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

//register new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        status: "error",
        message: "User already registered, login",
      });
    }

    user = new User({
      email,
      name,
      password,
    });

    //hashing password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    //generate token for all users
    const token = sign(
      {
        id: user._id,
      },
      "ESTHER",
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      status: "success",
      message: "Succesfully registered",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};

//user login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Email or password does not exist",
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        status: "error",
        message: "Email or password does not exist",
      });
    }
    const token = sign(
      {
        id: user._id,
      },
      "ESTHER",
      { expiresIn: "24h" }
    );
    return res.status(201).json({
      status: "success",
      message: "Login successfully",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};

//get user
const getUser = (req, res) => {
  const {
    user: { _id, name, email },
  } = req;
  return res.status(200).json({
    status: "Success",
    message: "User was retrieved successfully",
    data: {
      user: {
        _id,
        name,
        email,
      },
    },
  });
};

export { getUser, registerUser, login };
