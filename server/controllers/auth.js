const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../utils/generateAccessToken");
const jwt = require("jsonwebtoken");

const { userRegistrationValidation } = require("../utils/validation");

module.exports.register = async (req, res) => {
  let { username, email, password, month, day, year, profilePic } = req.body;

  // Validating info
  const { error } = userRegistrationValidation(req.body);
  if (error) return res.json(error.details[0].message);
  if (email.includes(" "))
    return res.status(400).json("Emails cannot be contain spaces");

  // Making sure email doesn't already exist
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).json("Email already exists");

  // Hashing password
  password = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password,
    month,
    day,
    year,
    profilePic,
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

    // Creating access token
    const accessToken = generateAccessToken(payload);

    res.json({ accessToken });
  } catch (error) {
    console.log({ error: error.message });
  }
};
