import { type Request, type Response } from "express";
import express from "express";
// const express = require("express");
import publicRoutes from "./routes/publicRoutes";
// import userRoutes from "./routes/userRoutes";
import recipesRoutes from "./routes/recipesRoutes";
import ingredientsRoutes from "./routes/ingredientsRoutes";
import { isSignedIn } from "./middleware/authenticator";

// config dotenv
import dotenv from "dotenv";
dotenv.config();

// config mongoose
import mongoose from "mongoose";
if (!process.env.MONGODB_URI) {
  throw new Error("Not Connected to Database");
}
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// can include for debug in server.ts
mongoose.set("debug", true);

const app = express();
const port = 3000;

// middlewares if any
app.use(express.json());
app.use((req, res, next) => {
  console.log("Received request:", req.method, req.url);
  next();
});

app.use("/", publicRoutes);
app.use(isSignedIn);
// app.use("/:userId", userRoutes);
app.use("/recipes", recipesRoutes);
app.use("/ingredients", ingredientsRoutes);

// routes
// app.get("/", (req: Request, res: Response) => {
//   res.send("<h1>Hello World!</h1>");
// });

app.get("/{*any}", (req, res) => {
  res.status(404).json({ message: `Where are you going?` });
});

// listen to port

const handleServerError = (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Warning! Port ${port} is already in use!`);
  } else {
    console.log("Error:", err);
  }
};

app
  .listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
  })
  .on("error", handleServerError);
