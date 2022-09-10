const Server = require("../models/Server");
const { serverCreationRegistration } = require("../utils/validation");

module.exports.createServer = async (req, res) => {
  const { title, banner, icon, description } = req.body;

  //   Validating info
  const { error } = serverCreationRegistration(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const newServer = new Server({
    title,
    banner,
    icon,
    description,
    ownerId: req.user._id,
  });

  try {
    await newServer.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
