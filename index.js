const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/emojiredirection");

const app = express();
const EmojiGenerator = require("./lib/emojiGenerator");
const routesApi = require("./routes/api");
const routesClient = require("./routes/client");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// app.use(ignoreFavicon);
app.use("/api", routesApi);
app.use(routesClient);
app.use("/", express.static(path.join(__dirname, "./client/build")));

app.listen(4000, () => console.log("server started"));
