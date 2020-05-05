const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  receivers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
