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
      expires: "24h"
    }
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", EmojiRedirect);

module.exports = Record;
