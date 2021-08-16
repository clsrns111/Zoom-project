const express = require("express");
const pug = require("pug");
const path = require("path");
const app = express();
const port = 3000;
const indexRouter = require("./routes/index");
const webSocket = require("./routes/soket");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use("/public", express.static(__dirname + "/public"));
app.use("/", indexRouter);
const server = app.listen(port, () => {
  console.log(port, "번 포트에서 대기중");
});

webSocket(server);
