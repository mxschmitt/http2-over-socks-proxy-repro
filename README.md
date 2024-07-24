Repro steps:

1. 
```
npm ci
node test.js
http_proxy=socks5://127.0.0.1:1080 epiphany-browser
```

2. Navigate to https://127.0.0.1:1081

Expected: Works
Actual: Peer sent fatal TLS alert: No supported application protocol could be negotiated
