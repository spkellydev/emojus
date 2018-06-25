const Link = require("../models/Link");

// @TODO move Link api functions to this class
class LinkController {
  constructor(record, emojis, req) {
    this.record = record;
    this.emojis = emojis;
    this.req = req;
  }

  setLinkRecord(cb) {
    delete this.record._id;
    let { linkId, url, emojiPath } = this.record;
    const newLink = new Link({
      linkId,
      url,
      emojiPath,
      emojis: this.emojis,
      linkData: {
        hits: 0,
        useragents: [],
        referrer: []
      }
    });

    newLink
      .save()
      .then(() => {
        console.log("saved");
        cb();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getLinkRecord() {
    let { linkId } = this.record;
    if (this.req.referrer == null) {
      this.req.referrer = "direct";
    }
    Link.findOneAndUpdate(
      { linkId },
      {
        $inc: { "linkData.hits": 1 },
        $push: {
          "linkData.useragents": {
            useragent: this.req.useragent,
            when: new Date()
          },
          "linkData.referrer": { referrer: this.req.referrer, when: new Date() }
        }
      }
    )
      .then(data => {
        if (!data) {
          this.setLinkRecord(() => this.getLinkRecord());
        } else {
          console.log(data);
          return (this.data = data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = LinkController;
