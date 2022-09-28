import { Response } from "express";
import { RouteReq } from "../utils/interfaces";
import { userRegisterValidation } from "../utils/validation";

import User from "../models/User";
import bcrypt from "bcrypt";

export const registerUser = async (req: RouteReq, res: Response) => {
  // Validation
  const { error } = userRegisterValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const { username, email, profilePic, month, day, year, banner } = req.body;
  let { password } = req.body;

  const generateUserTag = async () => {
    try {
      let tag: string = "";
      tag += Math.floor(1000 + Math.random() * 9000);

      const userTag = await User.findOne({ userTag: tag });
      if (userTag) {
        const tag: any = await generateUserTag();
        return tag;
      }
      return tag;
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  const userTag = await generateUserTag();
  password = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password,
    profilePic,
    month,
    day,
    year,
    banner,
    userTag,
  });
  try {
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};
