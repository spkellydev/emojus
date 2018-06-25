const mongoose = require("mongoose");

const LinkDataSchema = mongoose.Schema({
  hits: Number,
  useragents: [{}],
  referrer: [{}]
});

const LinkSchema = mongoose.Schema(
  {
    linkId: String,
    url: String,
    emojiPath: String,
    emojis: [String],
    linkData: LinkDataSchema
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", LinkSchema);
module.exports = Link;
