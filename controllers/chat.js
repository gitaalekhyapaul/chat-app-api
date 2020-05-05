const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/users");
const Chat = require("../models/chats");

exports.getChats = (req, res, next) => {
  User.findOne({ username: res.locals.user.username })
    .populate({
      path: "chats",
      populate: {
        path: "sender",
        select: "username -_id",
      },
      select: "-receivers -_id -__v",
    })
    .select("-_id -password -__v")
    .then((user) => {
      console.log(user);
      res.status(200).json({
        success: true,
        ...user._doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        err: "Server Error. Please try again.",
      });
    });
};

exports.sendChat = (req, res, next) => {
  const sender = new ObjectId(res.locals.user._id);
  const content = req.body.content;
  const chat = new Chat({
    sender: sender,
    content: content,
  });
  try {
    let receiverList = content
      .split(" ")
      .filter((word) => word.startsWith("@"))
      .map((word) => word.substring(1));
    User.find({ username: { $in: receiverList } })
      .then((result) => {
        return result.map((ele) => {
          return new ObjectId(ele._id);
        });
      })
      .then((list) => {
        receiverList = list;
        chat._doc.receivers = list;
        return chat.save();
      })
      .then((result) => {
        const chatId = new ObjectId(chat._id);
        return User.updateMany(
          { _id: { $in: receiverList } },
          { $push: { chats: chatId } }
        );
      })
      .then((result) => {
        res.status(200).json({
          success: true,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          err: `${err.name}`,
        });
      });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: "Bad request format. Missing content.",
    });
  }
};
