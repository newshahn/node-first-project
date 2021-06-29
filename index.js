const http = require("http");
const fs = require("fs");
const events = require("events");
const eventEmitter = events.EventEmitter();

http
  .createServer(function (req, res) {
    const baseURL = "http://" + req.headers.host + "/";
    const reqUrl = new URL(req.url, baseURL);
    var filename = "." + reqUrl.pathname + ".html";

    document.getElementById("about-me").onclick = function changePage() {
      filename = "./about.html";
    };

    document.getElementById("contact-me").onclick = function changePage() {
      filename = "./contact-me.html";
    };

    document.getElementById("home").onclick = function changePage() {
      filename = "./index.html";
    };

    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
