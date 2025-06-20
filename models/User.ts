import mongoose from "mongoose";

// note capitalisation, it is an object wrapper type
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  },
});

// Export the model:
// module.exports = Recipe;
export { User };
