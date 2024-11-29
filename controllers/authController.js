const {
  checkEmailExists,
  createUser,
  hashPassword,
  getUserByEmail,
} = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate email format (this can also be moved to a middleware)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  try {
    // Check if email exists
    const results = await checkEmailExists(email);
    if (results.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert the new user into the database
    const role = "admin";
    const result = await createUser(name, email, hashedPassword, role);

    // Send success response
    res.status(201).json({ message: "Admin registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering Admin." });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate email format (this can also be moved to a middleware)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  try {
    // Check if email exists
    const results = await checkEmailExists(email);
    if (results.length > 0) {
      return res.status(400).send("Email already exists.");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert the new user into the database
    const result = await createUser(name, email, hashedPassword);

    // Send success response
    res.status(201).send("User registered successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering User.");
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  // Call the model to get the user by email
  getUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (!results.length)
      return res.status(404).json({ message: "User not found" });

    const user = results[0];

    // Compare the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token with 15 minutes expiration
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Send JSON response with token and user details
    return res.status(200).json({
      message: "Login successful",
      token,
      name: user.name,
      role: user.role,
      email: user.email,
    });
  });
};

module.exports = { registerAdmin, registerUser, login };
