const Message = require("../models/Message");
const User = require("../models/User");
const Server = require("../models/Server");

module.exports.createMessage = async (req, res) => {
  const { body, serverId } = req.body;

  const newMessage = new Message({
    body,
    owner: req.user,
    serverId,
  });

  try {
    await newMessage.save();
    req.io.emit("message_created", newMessage);
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAllMessagesInServer = async (req, res) => {
  try {
    const server = await Server.findById(req.params.serverId);
    const messages = await Message.find({ serverId: server._id });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
