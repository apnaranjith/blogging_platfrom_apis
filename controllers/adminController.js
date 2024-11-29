const { checkUserExists, updateUserRole, getAllUsers ,updateUserBlockedStatus} = require('../models/usermodel');

const assignModerator = async (req, res) => {
  const { user_id } = req.body;

  // Check if user_id is provided
  if (!user_id) {
    return res.status(400).json({
      message: "User ID is required."
    });
  }

  try {
    // Check if the user exists
    const user = await checkUserExists(user_id);
    if (user.length === 0) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    // Update the user's role to 'Moderator'
    await updateUserRole(user_id, 'Moderator');
    
    return res.status(200).json({
      message: "User role updated to Moderator."
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error assigning Moderator role.",
      error: error.message
    });
  }
};
// Controller function to fetch all users
const fetchUsers = async (req, res) => {
    try {
      const users = await getAllUsers();
      res.status(200).json({
        message: "Users fetched successfully",
        users: users
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching users.",
        error: error.message
      });
    }
  };
  const blockUser = async (req, res) => {
    const { userId } = req.params;
    const { blocked } = req.body; // Expecting a boolean value (true or false)
  
    // Validate the 'blocked' field
    if (typeof blocked !== "boolean") {
      return res.status(400).json({
        message: "Invalid value for 'blocked'. It should be a boolean."
      });
    }
  
    try {
      // Update the 'blocked' status of the user
      const result = await updateUserBlockedStatus(userId, blocked);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "User not found."
        });
      }
  
      // Return success message
      res.status(200).json({
        message: `User ${blocked ? "blocked" : "unblocked"} successfully.`,
        user_id: userId
      });
    } catch (error) {
      res.status(500).json({
        message: "Error blocking/unblocking user.",
        error: error.message
      });
    }
  };
module.exports = { assignModerator,fetchUsers ,blockUser};
