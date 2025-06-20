import express from "express";
const userRoutes = express.Router();

import { index } from "../controllers/userController";

userRoutes.post("/", index);

export default userRoutes;
