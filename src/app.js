const express = require("express");
const app = express();
const fs = require("fs");
const HLSServer = require("hls-server");

app.get("/", (req, res) => {
  console.log("Streamer accessed.");
  return res.status(200).sendFile(`${__dirname}/index.html`);
});

const server = app.listen(8000);

new HLSServer(server, {
  provider: {
    exists: (req, cb) => {
      const ext = req.url.split(".").pop();

      if (ext !== "m3u8" && ext !== "ts") {
        return cb(null, true);
      }

      fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
        if (err) {
          console.log("File not exist");
          return cb(null, false);
        }
        cb(null, true);
      });
    },
    getManifestStream: (req, cb) => {
      const stream = fs.createReadStream(__dirname + req.url);
      cb(null, stream);
    },
    getSegmentStream: (req, cb) => {
      const stream = fs.createReadStream(__dirname + req.url);
      cb(null, stream);
    },
  },
});
