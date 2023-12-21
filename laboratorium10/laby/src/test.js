import http from 'http';
import fs from 'node:fs'
import path from 'path';

const port = 3000;

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'pictures', req.url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const extension = path.extname(filePath).slice(1);
    const contentType = `image/${extension}`;

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

