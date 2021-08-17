const http = require("http");
const express = require("express");
const pug = require("pug");
const path = require("path");
const app = express();
const WebSocket = require("ws");
const port = 3000;
const indexRouter = require("./routes/index");
const webSocket = require("./routes/soket");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const sokets = [];

wss.on("connection", (soket) => {
  sokets.push(soket);
  soket.onmessage = (message) => {
    const messageobj = JSON.parse(message.data);
    switch (messageobj.type) {
      case "message":
        return sokets.forEach((el) => {
          el.send(`${soket.nickname}:${messageobj.data}`);
        });
      case "nickname":
        return (soket["nickname"] = messageobj.data);
      default:
        break;
    }
  };

  soket.on("close", () => {
    console.log("클라이언트로부터 연결이 끊겼습니다.");
  });
});

server.listen(port, () => {
  console.log("connected loaclhost:3000");
});
