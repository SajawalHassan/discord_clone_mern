import { Request } from "express";
export interface RouteReq extends Request {
  io?: any;
  req?: object;
}
