const db = require('../config/dbconfig');

// Function to create a new blog post
const createBlogPost = (userId, title, contentDescription) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO blogs (user_id, title, content_description, validated) VALUES (?, ?, ?, ?)";
    db.query(query, [userId, title, contentDescription, false], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId); // Return the ID of the newly created blog post
    });
  });
};

// Function to fetch blog post details by post_id
const getBlogPostById = (postId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM blogs WHERE post_id = ?";
    db.query(query, [postId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows[0]); // Return the first row, which is the blog post
    });
  });
};
// Function to get all validated blog posts
const getValidatedPosts = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM blogs WHERE validated = true";
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results); // Return the blog posts
      });
    });
  };
  // Function to check if a post exists by postId
const getPostById = (postId) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM blogs WHERE post_id = ?";
      db.query(query, [postId], (err, results) => {
        if (err) return reject(err);
        resolve(results); // Return the blog post
      });
    });
  };
  
  // Function to update the post validation status
  const validatePost = (postId) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE blogs SET validated = ? WHERE post_id = ?";
      db.query(query, [true, postId], (err, results) => {
        if (err) return reject(err);
        resolve(results); // Return the result of the update operation
      });
    });
  };
  const getNonValidatedBlogs = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM blogs WHERE validated = false";
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results); // Return the non-validated blogs
      });
    });
  };

module.exports = { createBlogPost, getBlogPostById,getValidatedPosts,getPostById,validatePost,getNonValidatedBlogs };
