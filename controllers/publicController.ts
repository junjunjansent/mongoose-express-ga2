// import { Recipe } from "../models/Recipe";
import { type Request, type Response } from "express";
import { User } from "../models/User";

import { bcryptPassword, isPasswordBCryptValidated } from "../utils/bcrypt";
import { createJWT } from "../utils/jwt";

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    // should check if username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).json({ message: "User already exists." });
      return;
    }
    // creation
    const newUser = await User.create({
      username,
      password: bcryptPassword(password),
    });
    if (!newUser) {
      res
        .status(400)
        .json({ message: "Could not create user with given info" });
      return;
    }
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Server Error for Public, sorry" });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const oneUser = await User.findOne({ username });
    if (!oneUser || !isPasswordBCryptValidated(password, oneUser.password)) {
      res.status(401).json({ message: "Login Failed" });
      return;
    }
    // Login user
    const usernameToken = createJWT({
      username: oneUser.username,
      id: oneUser._id,
    });
    res
      .status(200)
      .json({ message: `Welcome, ${oneUser.username}`, token: usernameToken });
  } catch (err) {
    res.status(500).json({ message: "Server Error for Public, sorry" });
  }
};

export { registerUser, loginUser };
