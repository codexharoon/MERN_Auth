import bcryptjs from "bcryptjs";
import USER from "../models/user.js";

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
