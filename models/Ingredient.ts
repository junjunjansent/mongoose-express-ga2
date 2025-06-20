import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

// module.exports = Ingredient;
export { Ingredient };
