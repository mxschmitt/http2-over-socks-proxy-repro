const socks = require('socksv5');
const http2 = require('http2');
const fs = require('fs');

const server = socks.createServer((info, accept, deny) => {
  console.log('SOCKS connection requested');
  accept()
});

server.listen(1080, '127.0.0.1', function() {
  console.log('SOCKS server listening on port 1080');
});
server.useAuth(socks.auth.None());

const http2Server = http2.createSecureServer({
  key: fs.readFileSync('server_key.pem'),
  cert: fs.readFileSync('server_cert.pem'),
}, (req, res) => {
  console.log('HTTP2 request received');
  res.end('Hello, World!');
});

http2Server.listen(1081, '127.0.0.1', () => {
  console.log('HTTP2 server listening on port 443');
  console.log(`curl -v -k --proxy socks5://127.0.0.1:1080 https://127.0.0.1:1081`);
});
