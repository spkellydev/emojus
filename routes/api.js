const router = require("express").Router();
const dns = require("dns");
const Record = require("../models/Record");
const EmojiGenerator = require("../lib/emojiGenerator");
const linkDataRoutes = require("./linkData");

// /api/link-data
router.use("/link-data", linkDataRoutes);

// /api/redirect
router.post("/redirect", (req, res, next) => {
  let data = req.body;
  console.log(data);
  let response = {};

  // verify that the url has a vaild DNS by checking if nameservers exist
  dns.resolve(data.url, "NS", (err, records) => {
    if (err) {
      console.log(err);
      response = { record_created: false };
      next();
    } else {
      const emojiGenerator = new EmojiGenerator();
      let linkData = emojiGenerator.getRandomKeys();

      const record = new Record({
        linkId: linkData.persistantID,
        url: data.url,
        emojiPath: linkData.ids
      });

      response = { record_created: true, record, emojis: linkData.emojis };
      record.save().then(() => {
        console.log("saved");
      });
    }
    res.send(response);
  });
});

router.get("/redirect/:id", (req, res, next) => {
  let id = req.params.id;
  let response = {};
  Record.findOne({ linkId: id })
    .then(record => {
      res.json(record);
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

module.exports = router;
