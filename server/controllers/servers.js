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
    type: "text",
    categoryId: newTextCategory._id,
  });

  const newVoiceCategory = new Category({
    title: "Voice Channels",
    serverId: newServer._id,
  });

  const newVoiceChannel = new Channel({
    title: "General",
    type: "voice",
    categoryId: newVoiceCategory._id,
  });

  newServer.categories.push(newTextCategory._id, newVoiceCategory._id);
  newServer.channels.push(newTextChannel._id, newVoiceChannel._id);

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

module.exports.getServerById = async (req, res) => {
  try {
    const server = await Server.findById(req.params.id);
    const categories = await Category.find({ serverId: server._id });
    const channels = await Channel.find({
      categoryId: categories.map(({ _id }) => _id),
    });

    res.json({ server, categories, channels });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
