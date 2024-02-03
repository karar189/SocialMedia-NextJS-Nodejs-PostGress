// controllers/userController.js

const pool = require("../db/db"); // Assuming your database connection is in db.js

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const loginUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await pool.query("SELECT * FROM users WHERE username = $1", [
//       username,
//     ]);

//     if (user.rows.length === 0) {
//       return res.status(400).json({ error: "Invalid Credentials" });
//     }

//     const validPassword = password === user.rows[0].password; // Replace with password hashing comparison
//     if (!validPassword) {
//       return res.status(400).json({ error: "Invalid Credentials" });
//     }

//     res.json({ message: "Logged in successfully" });
//   } catch (error) {
//     console.error("Error logging in user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const validPassword = password === user.rows[0].password; // Replace with password hashing comparison
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Include the user ID in the response
    res.json({
      message: "Logged in successfully",
      userId: user.rows[0].id, // Send back the user ID
      username: user.rows[0].username, // Optionally send back the username
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Extract the user ID from the request parameters
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.rows[0]);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  loginUser,
  getUserById,
};
