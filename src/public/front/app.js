const socket = io();
const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
const nickname = document.getElementById("nickname");
const small = room.querySelector("small");
const online = document.getElementById("online");

room.hidden = true;
welcome.hidden = true;

let roomName;
let typing = false;
let timeout = undefined;
let userNickname;

function timeoutHandler() {
  typing = false;
  socket.emit("typing", roomName, "");
}

function onkeyDown(e, roomName) {
  console.log(e);
  if (!typing) {
    typing = true;
    socket.emit("typing", roomName, "상대방이 글을 작성중입니다.");
    timeout = setTimeout(timeoutHandler, 1000);
  } else {
    clearTimeout(timeout);
    timeout = setTimeout(timeoutHandler, 1000);
  }
}

function addOnline(msg) {
  const ul = online.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = msg;
  ul.appendChild(li);
}

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function showRoom() {
  welcome.hidden = false;
  const form = nickname.querySelector("form");
  form.addEventListener("submit", handleNicknameSubmit);
}

function showMessage() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showMessage);
  socket.emit("online", input.value, userNickname);
  roomName = input.value;
  input.value = "";
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

room.addEventListener("keyup", (e) => onkeyDown(e, roomName));

function handleNicknameSubmit(e) {
  e.preventDefault();
  const input = nickname.querySelector("input");
  userNickname = input.value;
  socket.emit("set_nickname", userNickname);
  input.value = "";
  nickname.hidden = true;
  welcome.hidden = false;
}

nickname.addEventListener("submit", handleNicknameSubmit);
welcome.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (nick) => {
  addMessage(`${nick} joined`);
});

socket.on("bye", (nick) => {
  addMessage(`${nick} left`);
});

function typingmessage(msg) {
  small.textContent = msg;
}

const input = room.querySelector("input");
input.addEventListener("keyup", (e) => onkeyDown(e, roomName));
socket.on("new_message", addMessage);

socket.on("typing", typingmessage);

/* const webSocket = new WebSocket(`ws://${window.location.host}`); */
/* 1.webSocket.onopen = function () {
  console.log("서버와 웹 소켓 연결됨");
}; */
//2

/* webSocket.addEventListener("open", () => {
  console.log("서버와 웹 소켓 연결됨!");
}); */

/*1 webSocket.onmessage = function (event) {
  console.log(event.data);
  webSocket.send("클라이언트에서 서버로 답장을 보냅니다.");
}; */
//2
/* webSocket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerHTML = `${message.data}`;
  li.innerHTML = `YOU: ${input.value}`;
  ul.append(li);
}); */

/* webSocket.addEventListener("close", () => {
  console.log("서버와 웹 소켓 끊김");
}); */
/* 
setTimeout(() => {
  webSocket.send("나는 클라이언트다");
}, 2000); */

/* function makeJson(type, data) {
  return JSON.stringify({
    type,
    data,
  });
}

message.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = message.querySelector("input");
  webSocket.send(makeJson("message", input.value));
  const li = document.createElement("li");
 
  input.value = "";
});

nickname.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = nickname.querySelector("input");
  webSocket.send(makeJson("nickname", input.value));
  input.value = "";
});
 */
/* 
message.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emiter;
});
 */
