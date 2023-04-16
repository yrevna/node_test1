const http = require("http");
const fs = require("fs");

function serveStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-type": "text/plain" });
      return res.end("500 — Внутренняя ошибка");
    }
    res.writeHead(responseCode, { "Content-type": contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
  switch (path) {
    case "":
      serveStaticFile(res, "/public/index.html", "text/html; charset=UTF-8");
      break;
    case "/about":
      serveStaticFile(res, "/public/about.html", "text/html; charset=UTF-8");
      break;
    case "/img/logo.jpg":
      serveStaticFile(res, "/public/img/logo.jpg", "text/html; charset=UTF-8");
      break;
    default:
      serveStaticFile(res, "/public/404.html", "text/html; charset=UTF-8", 404);
      break;
    case "/main.css":
      serveStaticFile(res, "/public/main.css", "text/css; charset=UTF-8");
      break;
  }
});

server.listen(8080, "127.0.0.1", () => {
  const info = server.address();
  console.log(`Сервер запущен ${info}`);
});
