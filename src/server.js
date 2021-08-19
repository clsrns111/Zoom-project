import http from "http";
import SocketIO from "socket.io";
import express from "express";
const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome", socket.nickname);
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}:${msg}`);
    socket.to(room).emit("typing", "");
    done();
  });

  socket.on("set_nickname", (nickname) => {
    socket["nickname"] = nickname;
  });

  socket.on("typing", (room, msg) => {
    socket.to(room).emit("typing", msg);
  });
});

/* const wss = new WebSocket.Server({ server });
 */
/* const sokets = [];
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
 */

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
