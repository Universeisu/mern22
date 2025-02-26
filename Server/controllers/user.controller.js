const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // เพิ่มการใช้งาน jwt
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
const MY_CUSTOM_JWT_KEY = process.env.MY_CUSTOM_JWT_KEY;

exports.sign = async (req, res) => {
  const { email } = req.body;
  // Check if email is provided
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Check if the user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  // Sign JWT token
  const token = jwt.sign(
    { user: user.email, role: user.role },
    MY_CUSTOM_JWT_KEY,
    {
      expiresIn: "1h",
    }
  );

  // Return the token
  return res.status(200).json({ token });
};

exports.addUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if the email already exists
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Create and save the new user
    const user = new UserModel({ email });
    await user.save();

    // Send the new user details in response
    return res.status(201).json(user);
  } catch (error) {
    // Improved error handling
    return res.status(500).send({
      message: error.message || "An error occurred while creating the user.",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      return res.status(200).json({ message: "No user" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while creating the user",
    });
  }
};

exports.updateUsers = async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ message: "Email and role are required" });
  }

  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { email, role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred while updating the user.",
    });
  }
};

exports.deleteAllUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while deleting the user.",
    });
  }
};

exports.makeAdmin = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    user.role = "admin";
    user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while changing user role to admin",
    });
  }
};

exports.makeUser = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    user.role = "user";
    await user.save(); // Ensure save is awaited
    res.status(200).json({ message: "User role updated to user", user });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "An error occurred while changing the user's role.",
    });
  }
};
