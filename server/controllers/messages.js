const Message = require("../models/Message");
const User = require("../models/User");
const Server = require("../models/Server");

module.exports.createMessage = async (req, res) => {
  const { body, serverId } = req.body;

  const newMessage = new Message({
    body,
    ownerId: req.user._id,
    serverId,
  });

  try {
    await newMessage.save();
    req.io.emit("message_created", { message: newMessage, user: req.user });
    res.json({ message: newMessage, user: req.user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports.getAllMessagesInServer = async (req, res) => {
  try {
    const server = await Server.findById(req.params.id);
    const messages = await Message.find({ serverId: server._id });
    const users = await User.find({
      _id: messages.map(({ ownerId }) => {
        return ownerId;
      }),
    });

    res.json({ messages, users });
  } catch (error) {
    res.json({ error: error.message });
  }
};
