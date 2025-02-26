const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user.controller");
const authJwt = require("../middlewares/authJwt.middleware");

// Sign-in route (POST /sign)
router.post("/sign", userController.sign);

// Add new user route (POST /add)
router.post("/add", userController.addUser);

// Get all users route (GET /)
router.get("/", userController.getAllUsers);

// Update user by ID (PUT /:id) - Requires authentication and admin role
router.put(
  "/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.updateUsers // Ensure this matches the method name
);

// Delete user by ID (DELETE /:id) - Requires authentication and admin role
router.delete(
  "/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.deleteAllUsers
);

// Make a user an admin (PATCH /admin/:email) - Requires authentication and admin role
router.patch(
  "/admin/:email",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.makeAdmin
);

// Make a user a regular user (PATCH /user/:email) - Requires authentication and admin role
router.patch(
  "/user/:email",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.makeUser
);

module.exports = router;
