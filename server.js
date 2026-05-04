const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(function (request, response) {
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to Country Explorer");
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server started at port: " + PORT);
});
