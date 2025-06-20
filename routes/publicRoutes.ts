import { type Request, type Response } from "express";

import express from "express";
const publicRoutes = express.Router();

import { registerUser, loginUser } from "../controllers/publicController";
import { registerUsersForDeveloper } from "../resetters/createUsers";

publicRoutes.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello World!</h1>");
});
publicRoutes.post("/register", registerUser);
publicRoutes.post("/login", loginUser);

export default publicRoutes;
