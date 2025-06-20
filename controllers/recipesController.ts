// import { Recipe } from "../models/Recipe";
import { type Request, type Response } from "express";
import { Recipe } from "../models/Recipe";
import { type RequestWithToken } from "../utils/jwt";
import { getUserFromRequest } from "../middleware/authenticator";

const index = async (req: Request, res: Response) => {
  console.log("Getting all recipes");
  try {
    const userId = getUserFromRequest(req as RequestWithToken);
    const recipeList = await Recipe.find({ owner: userId });
    res.status(200).json(recipeList);
  } catch (err) {
    res.status(500).json({ message: "Server Error for Recipe, sorry" });
  }
};

const create = async (req: Request, res: Response) => {
  console.log("Creating recipes");
  try {
    const userId = getUserFromRequest(req as RequestWithToken);
    const { recipeName, recipeInstructions, recipeIngredients } = req.body;
    //  name:
    //   instructions:
    //   owner:
    //   ingredients:
    const newRecipe = await Recipe.create({
      name: recipeName,
      instructions: recipeInstructions,
      owner: userId,
      ingredients: recipeIngredients,
    });
    if (!newRecipe) {
      res
        .status(400)
        .json({ message: "Could not create recipe with given info" });
      return;
    }
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: "Server Error for Recipe, sorry" });
  }
};

const show = async (req: Request, res: Response) => {
  console.log("Showing a recipe");
  try {
    const recipeId = req.params.recipeId;
    const oneRecipe = await Recipe.findById(recipeId);
    if (!oneRecipe) {
      res.status(400).json({ message: "Could not find recipe" });
      return;
    }
    res.status(200).json(oneRecipe);
  } catch (err) {
    res.status(500).json({ message: "Server Error for Recipe, sorry" });
  }
};

const update = async (req: Request, res: Response) => {
  console.log("Updating a recipe");
  try {
    const recipeId = req.params.recipeId;
    const userId = getUserFromRequest(req as RequestWithToken);
    // console.log(userId);
    const { recipeName, recipeInstructions, recipeIngredients } = req.body;
    //  name:
    //   instructions:
    //   owner:
    //   ingredients:
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        name: recipeName,
        instructions: recipeInstructions,
        owner: userId,
        ingredients: recipeIngredients,
      },
      { new: true }
    );
    if (!updatedRecipe) {
      res
        .status(400)
        .json({ message: "Could not update recipe with given info" });
      return;
    }
    res.status(201).json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: "Server Error for Recipe, sorry" });
  }
};

const destroy = async (req: Request, res: Response) => {
  console.log("Deleting recipe");
  try {
    const recipeId = req.params.recipeId;
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    if (!deletedRecipe) {
      res.status(400).json({ message: "Could not find recipe" });
      return;
    }
    res.status(200).json(deletedRecipe);
  } catch (err) {
    res.status(500).json({ message: "Server Error for Recipe, sorry" });
  }
};

export { index, create, show, update, destroy };
