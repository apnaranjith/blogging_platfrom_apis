const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyJWT(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Unauthorized");

  const tok_org = token.split(" ")[1];
  jwt.verify(tok_org, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Forbidden");

    req.user = decoded; // Attach user data to the request
    next(); // Proceed to the next middleware/route handler
  });
}

// Middleware to check the role of the user
function checkRole(requiredRole) {
  return (req, res, next) => {
    if (req.user.role === requiredRole) {
      return next(); // Allow access
    }
    return res.status(403).send("You do not have permission to access this resource.");
  };
}

module.exports = { verifyJWT, checkRole };
