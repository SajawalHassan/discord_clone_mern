const Server = require("../models/Server");
const Category = require("../models/Category");
const Channel = require("../models/Channel");
const { serverCreateValidation } = require("../utils/validation");

module.exports.createServer = async (req, res) => {
  // Validating info
  const { error } = serverCreateValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    // Creating server with default categories and channels
    const newServer = new Server({
      banner: req.body.banner,
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
      ownerId: req.user._id,
    });

    const newTextCategory = new Category({
      title: "Text channels",
      serverId: newServer._id,
    });

    const newTextChannel = new Channel({
      title: "General",
      categoryId: newTextCategory._id,
    });

    const newVoiceCategory = new Category({
      title: "Voice channels",
      serverId: newServer._id,
    });

    const newVoiceChannel = new Channel({
      title: "General",
      categoryId: newVoiceCategory._id,
    });

    await newServer.save();
    await newTextCategory.save();
    await newTextChannel.save();
    await newVoiceCategory.save();
    await newVoiceChannel.save();

    res.json({
      newServer,
      newTextCategory,
      newTextChannel,
      newVoiceCategory,
      newVoiceChannel,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};
