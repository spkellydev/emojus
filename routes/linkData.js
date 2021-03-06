const Link = require("../models/Link");
const router = require("express").Router();

// /api/link-data
router.get("/", (req, res) => {
  Link.find({})
    .sort("-date")
    .limit(10)
    .exec((err, links) => {
      res.json(links);
    });
});

// /api/link-data/:id
router.get("/:id", (req, res) => {
  Link.find({ linkId: req.params.id })
    .then(link => {
      let response = link.length ? link : { error: "trouble finding link" };
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
