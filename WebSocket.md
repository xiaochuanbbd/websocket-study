## websocket 使浏览器具备了双向通信的能力

## websocket
提供了一种在浏览器和服务器之间建立持久链接来交换数据的方式，数据可以作为：数据包“
在两个方向上传递，而不会断开连接和其他HTTP请求
* 可以在浏览器中使用
* 支持双向通信
* 使用很简单

### wss 类似于websocket中的HTTPS
ws://中的数据不是加密的， 对于任何中间人来说数据都是可见的
wss://是基于TLS的WebScoket ，类似于HTTPS是基于TLS的HTTP

### 监听scoket上的四个事件
* open ---连接已建立
* message --- 接收到数据
* error ---WebScoket错误
* close ---连接已关闭
* scoket.send()发送数据

### 浏览器header详解
* Origin ：客户端页面的源，WebSocket对象是原生支持跨域的， 没有特殊的header或其他限制，旧的服务器无法处理WebScoket，因此不存在兼容性问题，但是Origin header很重要，它允许服务器是否允许使用WebScoket与该网站通信
* connection :Upgrade 表示客户端想要更改协议
* Upgrade :websocket 请求的协议是 WebScoket
* Sec-WebSocket-Key 浏览器随机生成的安全密钥
*  Sec-WebSocket-Version WebScoket的协议版本 

### 不能使用XMLHttpRequest或fetch来进行请求因为不允许JavaScript设置这些header

### 服务端如果同意切换WebScoket协议，服务端返回响应码为101

### 数据传输
websocket通信由frames组成 ，可以从任何一方发送，分为以下几类
* text frames 文本数据
* binary data frames 二进制数据
* ping/pong frames 检查服务器发送的链接，浏览器会自动响应

WebScoket.send()可以发送文本或者二进制数据
包括 blob，ArraBuffer等

### 连接关闭
socked.close([code ],[reason ])
* code 是一个特殊的web Socket关闭码（可选）
* reason是一个描述关闭原因的字符串（可选）
```javascript
//关闭方：
socket.close(1000,'work compleate')
//另一方
socket.onclose = event=>{
  // event.code === 1000
  // event.reason === "Work complete"
  // event.wasClean === true (clean close)
}
```
常见的关闭数字码： 
* 1000 默认 正常关闭，没有指明code时使用
* 1006 没有办法手动设置这个数组，表示连接丢失
* 1001 一方正在离开， 例如服务器正在关闭，或者浏览器离开了该页面
* 1009 消息过大 无法处理
* 1011 服务器上发生意外错误

### 连接状态
* 0 --- 'COMMECTING' 连接还未建立
* 1 --- 'OPEN' 通信中
* 2 ---'CLOSEING' 连接管比重
* 3 ---'CLOSE'连接已关闭

## 总结：
websocket是一种在浏览器和服务器之间建立持久连接的现代方式
* websocket没有跨域限制
* 浏览器对websocket支持很好
* 可以发送/接受字符串和二进制数据

websocket的api：
* socket.send(data)
* socket.close([code ],[reason ])

websocket事件：
* open
* message
* error
* close

websocket服务器和主http服务器并行运行，并且他们之间享有同一个数据库。

