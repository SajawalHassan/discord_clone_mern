const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userRegistrationValidation } = require("../utils/validation");
const generateAccessToken = require("../utils/generateAccessToken");
const RefreshToken = require("../models/RefreshToken");

const register = async (req, res) => {
  // Validating info
  const { error } = userRegistrationValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    // Hashing password
    hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json(newUser);
  } catch (error) {
    res.json({ error: error?.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json("Invalid email or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json("Invalid email or password");

    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdServers: user.createdServers,
      joinedServers: user.joinedServers,
    };

    // Creating refresh and access tokens
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(
      user.toJSON(),
      process.env.REFRESH_TOKEN_SECRET
    );

    const newRefreshToken = new RefreshToken({
      refreshToken: refreshToken,
    });

    await newRefreshToken.save();

    res.json({
      accessToken,
      refreshToken,
      username: user.username,
      email: user.email,
      createdServers: user.createdServers,
      joinedServers: user.joinedServers,
    });
  } catch (error) {
    res.json({ error: error?.message });
  }
};

module.exports = { register, login };
