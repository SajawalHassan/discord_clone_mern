import { Response } from "express";
import { RouteReq } from "../utils/interfaces";

import User from "../models/User";

export const getCurrentUser = async (req: RouteReq, res: Response) => {
  try {
    const user = await User.findById(req.user?._id);

    res.json(user);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const getAllUsers = async (req: RouteReq, res: Response) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
