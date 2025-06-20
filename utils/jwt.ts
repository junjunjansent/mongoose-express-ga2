import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { Request } from "express";
dotenv.config();

type RequestWithToken = Request & {
  user: {
    username: string;
    id: string;
  };
};

const getTokenFromReq = (req: Request) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return null;
  }
  return authHeader.split(" ")[1];
};

const createJWT = (payload: string | object) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Check JWT_SECRET definition");
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2 days",
  });
  return token;
};

const decodeJWT = (token: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Check JWT_SECRET definition");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

export { type RequestWithToken, getTokenFromReq, createJWT, decodeJWT };
