const router = require("express").Router();
const dns = require("dns");
const Record = require("../models/Record");
const EmojiGenerator = require("../lib/emojiGenerator");
const linkDataRoutes = require("./linkData");

router.use("/link-data", linkDataRoutes);

router.post("/redirect", (req, res) => {
  let data = req.body;
  console.log(data);
  let response = {};
  dns.resolve(data.url, "ANY", (err, records) => {
    if (err) {
      console.log(err);
      response = { record_created: false };
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

router.get("/redirect/:id", (req, res) => {
  let id = req.params.id;
  let response = {};
  Record.findOne({ linkId: id })
    .then(record => {
      res.json(record);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
