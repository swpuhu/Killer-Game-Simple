const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const port = 8080;
const root = path.resolve(__dirname, './src');

const index = '/page/setting/setting.html';

const server = http.createServer(function (request, response) {
  let pathname = url.parse(request.url).pathname;
  let filepath = path.join(root, pathname);
  fs.stat(filepath, function (err, stats) {
    if (!err && stats.isFile()) {
      if (/\.js|mjs$/.test(filepath)) {
        response.writeHead(200, {'Content-Type': 'application/javascript'});
      } else if (/\.css$/.test(filepath)) {
        response.writeHead(200, {'Content-Type': 'text/css'});
      } else if (/\.html$/.test(filepath)) {
        response.writeHead(200, {'Content-Type': 'text/html'});
      } else {
        response.writeHead(200);
      }
      fs.createReadStream(filepath).pipe(response);
    } else {
      response.writeHead(404);
      response.end();
    }
  });
});

server.listen(port);
console.log('server is running on http://localhost:' + port + index);
console.log('root directory is at ' + root);
