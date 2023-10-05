const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} - ${req.url}`;
  fs.appendFile('log.txt', log, (err, data) => {
    switch (req.url) {
      case '/':
        res.end('From home page');
        break;

      case '/contact':
        res.end(`Hello, I'm Zaheer`);
        break;

      default:
        res.end(`Page not found: ${req.url}`);
        break;
    }
  });
});

myServer.listen(8000, () => {
  console.log('listening on port 8000 ');
});
