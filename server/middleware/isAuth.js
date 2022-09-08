const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Grabbing and validating token
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  // Verifying token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};
