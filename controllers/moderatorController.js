const {getPostById,validatePost,getNonValidatedBlogs}=require("../models/blogmodel");

// Controller function to validate a post
const validatePostController = async (req, res) => {
    const { postId } = req.params;
  
    try {
      // Check if the post exists
      const post = await getPostById(postId);
      
      if (post.length === 0) {
        return res.status(404).json({
          message: "Post not found."
        });
      }
  
      // Validate the post by updating the 'validated' field to true
      await validatePost(postId);
  
      // Successfully validated the post
      res.status(200).json({
        message: "Post validated successfully."
      });
    } catch (error) {
      res.status(500).json({
        message: "Error validating post.",
        error: error.message
      });
    }
  };
  // Controller function to get all non-validated blogs
const getNonValidatedBlogsController = async (req, res) => {
    try {
      // Get the non-validated blogs
      const blogs = await getNonValidatedBlogs();
  
      // If no blogs found
      if (blogs.length === 0) {
        return res.status(404).send("No non-validated blogs found.");
      }
  
      // Return the non-validated blogs
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching non-validated blogs.",
        error: error.message
      });
    }
  };
  module.exports={validatePostController,getNonValidatedBlogsController}