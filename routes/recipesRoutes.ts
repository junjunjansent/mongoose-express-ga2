import express from "express";
const recipesRoutes = express.Router();

import {
  index,
  create,
  show,
  update,
  destroy,
} from "../controllers/recipesController";

// recipesRoutes.use((req, res, next) => {
//   console.log("recipesRoutes middleware hit", req.method, req.url);
//   next();
// });

recipesRoutes.get("/", index);
recipesRoutes.post("/", create);
recipesRoutes.get("/:recipeId", show);
recipesRoutes.put("/:recipeId", update);
recipesRoutes.delete("/:recipeId", destroy);

export default recipesRoutes;
