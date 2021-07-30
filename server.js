// server.js
// where your node app starts

// init project
import express from "express";
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
import cors from "cors";
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

import moment from "moment";

app.get("/api/", (_, res) => {
  const now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

app.get("/api/:date", (req, res) => {
  const paramDate = req.params.date;
  const date = !isNaN(paramDate)
    ? new Date(parseInt(paramDate))
    : moment.utc(paramDate, "YYYY-MM-DD", true).isValid()
    ? new Date(paramDate)
    : moment.utc(paramDate, "DD MMMM YYYY", true).isValid()
    ? moment.utc(paramDate, "DD MMMM YYYY").toDate()
    : undefined;

  if (!date) {
    res.status(400).json({ error: "Invalid Date" });
    return;
  }

  const unix = date.getTime();
  const utc = date.toUTCString();

  res.json({ unix, utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT ?? 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
