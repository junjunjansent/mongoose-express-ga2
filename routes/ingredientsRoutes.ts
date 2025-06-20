import express from "express";
const ingredientsRoutes = express.Router();

import {
  index,
  create,
  show,
  update,
  destroy,
} from "../controllers/ingredientsController";

ingredientsRoutes.use((req, res, next) => {
  console.log("ingredientsRoutes middleware hit", req.method, req.url);
  next();
});

ingredientsRoutes.get("/", index);
ingredientsRoutes.post("/", create);
ingredientsRoutes.get("/:ingredientId", show);
ingredientsRoutes.put("/:ingredientId", update);
ingredientsRoutes.delete("/:ingredientId", destroy);

export default ingredientsRoutes;
