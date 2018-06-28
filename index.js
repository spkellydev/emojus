const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const favicon = require("serve-favicon");
const path = require("path");
const PORT = process.env.port || 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/emojiredirection");

const app = express();
const routesApi = require("./routes/api");
const routesClient = require("./routes/client");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(favicon(path.join(__dirname, "./client/build/favicon.ico")));

app.use("/api", routesApi);
app.use(routesClient);
app.use("/", express.static(path.join(__dirname, "./client/build")));

app.listen(PORT, () => console.log("server started"));
