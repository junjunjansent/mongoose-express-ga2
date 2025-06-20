import { type Request, type Response } from "express";
import { bcryptPassword } from "../utils/bcrypt";
import { User } from "../models/User";

const registerUsersForDeveloper = async () => {
  const usersData = [
    { username: "userA", password: bcryptPassword("123") },
    { username: "userB", password: bcryptPassword("123") },
  ];
  try {
    await User.deleteMany({});
    const newUsers = await User.create(usersData);
    console.log(newUsers);
  } catch (err) {
    console.log(err);
  }
};

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB to recreate User Base");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await registerUsersForDeveloper();

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

connect();

export { registerUsersForDeveloper };
