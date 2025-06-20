import { type Request, type Response } from "express";
import { Ingredient } from "../models/Ingredient";
import { type RequestWithToken } from "../utils/jwt";
import { getUserFromRequest } from "../middleware/authenticator";

const index = async (req: Request, res: Response) => {
  console.log("Getting all ingredients");
  try {
    const ingredientList = await Ingredient.find({});
    res.status(200).json(ingredientList);
  } catch (err) {
    res.status(500).json({ message: "Server Error for Ingredient, sorry" });
  }
};

const create = async (req: Request, res: Response) => {
  console.log("Creating an ingredient");
  try {
    const { ingredientName } = req.body;
    // check existingIngredient
    const existingIngredient = await Ingredient.findOne({
      name: ingredientName,
    });
    if (existingIngredient) {
      res.status(409).json({ message: "Ingredient already exists." });
      return;
    }

    console.log("am i here");

    // create new Ingredient
    const newIngredient = await Ingredient.create({
      name: ingredientName,
    });
    if (!newIngredient) {
      res
        .status(400)
        .json({ message: "Could not create ingredient with given info" });
      return;
    }
    res.status(201).json(newIngredient);
  } catch (err) {
    res.status(500).json({ message: "Server Error for Ingredient, sorry" });
  }
};

const show = async (req: Request, res: Response) => {
  console.log("Show an ingredient");
  try {
    const ingredientId = req.params.ingredientId;
    const oneIngredient = await Ingredient.findById(ingredientId);
    if (!oneIngredient) {
      res.status(400).json({ message: "Could not find ingredient" });
      return;
    }
    res.status(200).json(oneIngredient);
  } catch (err) {
    res.status(500).json({ message: "Server Error for Ingredient, sorry" });
  }
};

const update = async (req: Request, res: Response) => {
  console.log("Update an ingredient");
  try {
    const ingredientId = req.params.ingredientId;
    const { ingredientName } = req.body;
    //  name:
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      ingredientId,
      {
        name: ingredientName,
      },
      { new: true }
    );
    if (!updatedIngredient) {
      res
        .status(400)
        .json({ message: "Could not update ingredient with given info" });
      return;
    }
    res.status(201).json(updatedIngredient);
  } catch (err) {
    res.status(500).json({ message: "Server Error for Ingredient, sorry" });
  }
};

const destroy = async (req: Request, res: Response) => {
  console.log("Delete an ingredient");
  try {
    const ingredientId = req.params.ingredientId;
    const deletedIngredient = await Ingredient.findByIdAndDelete(ingredientId);
    if (!deletedIngredient) {
      res.status(400).json({ message: "Could not find ingredient" });
      return;
    }
    res.status(200).json(deletedIngredient);
  } catch (err) {
    res.status(500).json({ message: "Server Error for Ingredient, sorry" });
  }
};

export { index, create, show, update, destroy };
