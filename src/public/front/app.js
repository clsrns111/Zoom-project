const webSocket = new WebSocket("ws://localhost:3000");
webSocket.onopen = function () {
  console.log("서버와 웹 소켓 연결됨");
};
webSocket.onmessage = function (event) {
  console.log(event.data);
  webSocket.send("클라이언트에서 서버로 답장을 보냅니다.");
};
