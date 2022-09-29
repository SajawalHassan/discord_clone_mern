import { Response } from "express";
import { RouteReq } from "../utils/interfaces";

export const protectedRoute = async (req: RouteReq, res: Response) => {
  res.json(req.user);
};
