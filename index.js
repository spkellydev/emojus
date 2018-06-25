const app = require("express")();
const bodyParser = require("body-parser");
const EmojiGenerator = require("./lib/emojiGenerator");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/emojiredirection");
const routesApi = require("./routes/api");
const routesClient = require("./routes/client");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === "/favicon.ico") {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
}
app.use(ignoreFavicon);
app.use("/api", routesApi);
app.use(routesClient);
// const _perf = require("perf_hooks").performance;
// const util = require("util");
// const debug = util.debuglog("performance");

// _perf.measure("start to finish", "begin", "recieved");
// let measurements = _perf.getEntriesByType("measure");
// measurements.forEach(measurement => {
//   console.log(`${measurement.name} -- ${measurement.duration}`);
// });

// let record = new Record({
//   url: "https://www.google.com/",
//   emojiPath: "[bee][nose][birthday][wink][tongue]"
// });

// record.save().then(() => console.log("meow"));

app.get("/", (req, res) => {
  res.send("home");
  // res.redirect(randoEmojisArr.join().replace(/,/g, ""));
});

app.listen(4000, () => console.log("server started"));
