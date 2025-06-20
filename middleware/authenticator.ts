import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";

import {
  getTokenFromReq,
  decodeJWT,
  type RequestWithToken,
} from "../utils/jwt";
import type { JwtPayload } from "jsonwebtoken";

const saveUserToRequest = (req: Request, decodedUser: JwtPayload): void => {
  // TODO: make this cleaner or more type safe...
  (req as any).user = decodedUser;
};

const getUserFromRequest = (req: RequestWithToken) => {
  return req.user.id;
};

const isSignedIn: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenFromReq(req);
  if (!token) {
    res.status(401).json({ error: "Not authorised" });
    return;
  }
  try {
    const decoded = decodeJWT(token);
    if (!decoded || typeof decoded === "string") {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    saveUserToRequest(req, decoded);

    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorised" });
    return;
  }
};

export { getUserFromRequest, isSignedIn };
