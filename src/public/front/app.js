const ul = document.querySelector("ul");
const message = document.getElementById("message");
const nickname = document.getElementById("nickname");
const webSocket = new WebSocket(`ws://${window.location.host}`);
/* 1.webSocket.onopen = function () {
  console.log("서버와 웹 소켓 연결됨");
}; */
//2

webSocket.addEventListener("open", () => {
  console.log("서버와 웹 소켓 연결됨!");
});

/*1 webSocket.onmessage = function (event) {
  console.log(event.data);
  webSocket.send("클라이언트에서 서버로 답장을 보냅니다.");
}; */
//2
webSocket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerHTML = `${message.data}`;
  ul.appendChild(li);
});

/* webSocket.addEventListener("close", () => {
  console.log("서버와 웹 소켓 끊김");
}); */
/* 
setTimeout(() => {
  webSocket.send("나는 클라이언트다");
}, 2000); */

function makeJson(type, data) {
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
  li.innerHTML = `YOU: ${input.value}`;
  ul.append(li);
  input.value = "";
});

nickname.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = nickname.querySelector("input");
  webSocket.send(makeJson("nickname", input.value));
  input.value = "";
});
