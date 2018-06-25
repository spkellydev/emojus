const router = require("express").Router();
const EmojiGenerator = require("../lib/emojiGenerator");
const LinkController = require("../controllers/LinkController");
const Record = require("../models/Record");

router.get("/:emojis", (req, res) => {
  let reqPath = req.path.slice(1);
  let reqHeaders = {
    useragent: req.headers["user-agent"],
    referrer: req.headers["referer"]
  };
  const emojiGenerator = new EmojiGenerator();
  emojiGenerator.convertReqObjToEmojiKeys(reqPath);
  let linkIdentifier = emojiGenerator.encodeEmojisToId(
    emojiGenerator.emojiKeys
  );

  Record.findOne({ linkId: linkIdentifier }, (err, record) => {
    if (err) console.log(err);
    let url = "";

    if (record == null) {
      url = req.hostname + ":4000";
    } else {
      url = record.url;
      const link = new LinkController(
        record,
        [...decodeURI(reqPath.replace("/favicon.ico", ""))],
        reqHeaders
      );
      link.getLinkRecord();
    }

    res.redirect("//" + url);
  });
});

module.exports = router;
