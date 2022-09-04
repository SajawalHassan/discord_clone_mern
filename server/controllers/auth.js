const User = require("../models/User");
const bcrypt = require("bcrypt");

const { userRegistrationValidation } = require("../utils/validation");

const register = async (req, res) => {
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
    res.json({ error: error.message });
  }
};

module.exports = { register };
