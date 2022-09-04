const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Getting token and verifying it exists
  const authHeader = req.header("Authorization");
  var token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).json("Access Denied!");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(403);

    // Pushing user into req
    req.user = user;
    next();
  });
};
