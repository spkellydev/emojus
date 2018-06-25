const mongoose = require("mongoose");

/**
 * EmojiRedirect Schema
 * creates index to set expiry date
 */
const EmojiRedirect = mongoose.Schema(
  {
    linkId: String,
    url: String,
    emojiPath: String,
    createdAt: {
      type: Date,
      expires: "7d" // set expiry index for document
    }
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", EmojiRedirect);

module.exports = Record;
