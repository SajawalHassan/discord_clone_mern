const Category = require("../models/Category");
const Channel = require("../models/Channel");
const Server = require("../models/Server");
const User = require("../models/User");
const { serverCreationRegistration } = require("../utils/validation");

module.exports.createServer = async (req, res) => {
  const { title, banner, icon, description } = req.body;
  const user = await User.findById(req.user._id);

  // Validating info
  const { error } = serverCreationRegistration(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const newServer = new Server({
    title,
    description,
    banner,
    icon,
    ownerId: req.user._id,
  });

  await user.updateOne({ $push: { createdServers: newServer._id } });

  const newTextCategory = new Category({
    title: "Text Channels",
    serverId: newServer._id,
  });

  const newTextChannel = new Channel({
    title: "General",
    categoryId: newTextCategory._id,
  });

  const newVoiceCategory = new Category({
    title: "Voice Channels",
    serverId: newServer._id,
  });

  const newVoiceChannel = new Channel({
    title: "General",
    categoryId: newVoiceCategory._id,
  });

  try {
    await newServer.save();
    await newTextCategory.save();
    await newTextChannel.save();
    await newVoiceCategory.save();
    await newVoiceChannel.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  res.json({
    newServer,
    newTextCategory,
    newTextChannel,
    newVoiceCategory,
    newVoiceChannel,
  });
};

module.exports.getCreatedServers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const servers = await Server.find({ _id: user.createdServers });
    res.json(servers);
  } catch (error) {
    res.json({ error: error.message });
  }
};
