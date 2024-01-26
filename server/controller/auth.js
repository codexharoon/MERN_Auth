import bcryptjs from "bcryptjs";
import USER from "../models/user.js";
import { errorHandler } from "../utils/error-handler.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const newUSER = new USER({
      username,
      email,
      password: hashedPassword,
    });

    await newUSER.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await USER.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Credientials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: hashedPassword, ...rest } = validUser._doc;

    res.cookie("access_token", token, { httpOnly: true }).json({
      message: "User logged in successfully",
      ...rest,
    });
  } catch (error) {
    next(error);
  }
};
