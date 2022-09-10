const User = require("../models/User");

module.exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
};
