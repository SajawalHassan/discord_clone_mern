const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../utils/generateAccessToken");
const jwt = require("jsonwebtoken");

const { userRegistrationValidation } = require("../utils/validation");

module.exports.register = async (req, res) => {
  let { username, email, password } = req.body;

  // Validating info
  const { error } = userRegistrationValidation(req.body);
  if (error) return res.json(error.details[0].message);

  // Making sure email doesn't already exist
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).json("Email already exists");

  // Hashing password
  password = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password,
  });

  try {
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validating email
    const userEmail = await User.findOne({ email: email });
    if (!userEmail) return res.status(400).json("Invalid email or password");

    // Validating password
    const validPassword = await bcrypt.compare(password, userEmail?.password);
    if (!validPassword)
      return res.status(400).json("Invalid email or password");

    const payload = {
      username: userEmail.username,
      email: userEmail.email,
      joinedServers: userEmail.joinedServers,
      createdServers: userEmail.createdServers,
      _id: userEmail._id,
    };

    // Creating access and refresh tokens
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(
      userEmail.toJSON(),
      process.env.REFRESH_TOKEN_SECRET
    );

    const newRefreshToken = new RefreshToken({
      refreshToken: refreshToken,
    });

    await newRefreshToken.save();

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const _refreshToken = await RefreshToken.findOne({
      refreshToken,
    });
    if (refreshToken == null) return res.sendStatus(401);
    if (!_refreshToken) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json(err);
      const payload = {
        username: user.username,
        email: user.email,
        joinedServers: user.joinedServers,
        createdServers: user.createdServers,
        _id: user._id,
      };
      const accessToken = generateAccessToken(payload);
      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.protected = (req, res) => {
  res.json({ user: req.user });
};
