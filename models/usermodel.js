const db = require("../config/dbconfig"); 
const bcrypt = require("bcrypt");

// Function to check if an email already exists in the database
const checkEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Function to insert a new user
const createUser = (name, email, hashedPassword, role="User") => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, hashedPassword, role], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const getUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Function to hash a password
const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};
// Query to check if the user exists in the database
const checkUserExists = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE user_id = ?";
    db.query(query, [user_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Query to update the user's role
const updateUserRole = (user_id, role) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE users SET role = ? WHERE user_id = ?";
    db.query(query, [role, user_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT user_id, name,  email, role, blocked FROM users";
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
const updateUserBlockedStatus = (userId, blocked) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE users SET blocked = ? WHERE user_id = ?";
    db.query(query, [blocked, userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = { checkEmailExists, createUser, hashPassword, getUserByEmail,
  checkUserExists, updateUserRole , getAllUsers, updateUserBlockedStatus};
