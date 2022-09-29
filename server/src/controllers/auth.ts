import { Response } from "express";
import { RouteReq } from "../utils/interfaces";
import { userRegisterValidation } from "../utils/validation";

import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generateAccessToken from "../utils/generateAccessToken";
dotenv.config();

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

export const loginUser = async (req: RouteReq, res: Response) => {
  const { email, password } = req.body;

  const ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET: any = process.env.REFRESH_TOKEN_SECRET;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("Login or password is invalid");

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json("Login or password is invalid");

    const payload = {
      username: user.username,
      _id: user._id,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(
      {
        username: user.username,
        _id: user._id,
      },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    await user.updateOne({ $set: { refreshToken: refreshToken } });

    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 2592000000 });
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const refreshToken = async (req: RouteReq, res: Response) => {
  const cookies: any = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json("Jwt is not present in cookies");

  const refreshToken: string = cookies.jwt;
  const REFRESH_TOKEN_SECRET: any = process.env.REFRESH_TOKEN_SECRET;

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.status(403).json("User not found");

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json(err);

    const payload = {
      username: user.username,
      _id: user._id,
    };

    const accessToken = generateAccessToken(payload);

    res.json({ accessToken });
  });
};

export const logoutUser = async (req: RouteReq, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 2592000000 });
    return res.sendStatus(204);
  }

  await foundUser.updateOne({ $set: { refreshToken: "" } });

  res.clearCookie("jwt", { httpOnly: true, maxAge: 2592000000 });
  res.sendStatus(204);
};
