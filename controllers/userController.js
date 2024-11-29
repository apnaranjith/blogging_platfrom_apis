const { createBlogPost, getBlogPostById,getValidatedPosts } = require('../models/blogmodel');

// Controller function to create a new blog post
const createPost = async (req, res) => {
  const { title, content_description } = req.body;
  const userId = req.user.id; // Get the user ID from JWT payload

  // Check if title and content_description are provided
  if (!title || !content_description) {
    return res.status(400).json({
      message: "title and content_description are missing"
    });
  }

  try {
    // Create the new blog post
    const newBlogId = await createBlogPost(userId, title, content_description);

    // Retrieve the newly created blog post details
    const blog = await getBlogPostById(newBlogId);

    // Return the blog post details in the response
    res.status(201).json({
      message: "Blog post created successfully.",
      blog: blog // Return the details of the created blog post
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating the blog post.",
      error: error.message
    });
  }
};
const getPosts = async (req, res) => {
    try {
      // Fetch validated blog posts from the model
      const posts = await getValidatedPosts();
  
      // If no posts are found
      if (posts.length === 0) {
        return res.status(404).json({
          message: "No posts found."
        });
      }
  
      // Return the blog posts as a JSON response
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching posts.",
        error: error.message
      });
    }
  };

module.exports = { createPost ,getPosts};
