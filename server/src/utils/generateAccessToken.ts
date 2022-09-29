import jwt from "jsonwebtoken";

export default (payload: object) => {
  const ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
};
