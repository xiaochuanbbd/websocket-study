// const ws = new require('ws');
// const wss = new ws.Server({noServer: true});
// const http = require('http');

// http.createServer((req, res) => {
//   // 在这里，我们仅处理 WebSocket 连接
//   // 在实际项目中，我们在这里还会有其他代码，来处理非 WebSocket 请求
//   wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
// });

// function onSocketConnect(ws) {
//   clients.add(ws);

//   ws.on('message', function(message) {
//     message = message.slice(0, 50); // message 的最大长度为 50

//     for(let client of clients) {
//       client.send(message);
//     }
//   });

//   ws.on('close', function() {
//     clients.delete(ws);
//   });
// }
// app.listen(3000,function(){
//   console.log('3000端口监听中');
// })
var app = require('express')()
var server = require('http').Server(app)
const { log } = require('console');
var WebSocket = require('ws')
const clients = new Set();

var wss = new WebSocket.Server({
  port: 8080
})

wss.on('connection', function connection(ws) {
  clients.add(ws);
  ws.on('message', function incoming(message) {
    message = message.slice(0, 50); // message 的最大长度为 50
    for (let client of clients) {
      
      client.send(message);
    }
  });
  ws.on('close', function () {
    clients.delete(ws);
  });
})

//   ws.on('message', function(message) {
//     message = message.slice(0, 50); // message 的最大长度为 50

//     for(let client of clients) {
//       client.send(message);
//     }
//   });

//   ws.on('close', function() {
//     clients.delete(ws);
//   });

// })
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.listen(3000, function () {
  console.log('3000端口监听中');
})
// const http = require('http');
// const ws = require('ws');

// const wss = new ws.Server({noServer: true});

// function accept(req, res) {
//   // all incoming requests must be websockets
//   if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
//     res.end();
//     return;
//   }

//   // can be Connection: keep-alive, Upgrade
//   if (!req.headers.connection.match(/\bupgrade\b/i)) {
//     res.end();
//     return;
//   }

//   wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
// }

// function onConnect(ws) {
//   ws.on('message', function (message) {
//     message = message.toString();
//     let name = message.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) || "Guest";
//     ws.send(`Hello from server, ${name}!`);

//     setTimeout(() => ws.close(1000, "Bye!"), 5000);
//   });
// }

// if (!module.parent) {
//   http.createServer(accept).listen(8080);
// } else {
//   exports.accept = accept;
// }