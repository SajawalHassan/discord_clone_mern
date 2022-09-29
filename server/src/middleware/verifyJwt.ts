import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { RouteReq } from "../utils/interfaces";
import { NextFunction, Response } from "express";

export default (req: RouteReq, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json("Auth header is not present");

  const ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
  const token = authHeader.split(" ")[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json("Jwt expired");

    req.user = user;
    next();
  });
};
