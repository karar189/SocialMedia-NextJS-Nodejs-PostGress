const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

//user routes
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUserById);

module.exports = router;
