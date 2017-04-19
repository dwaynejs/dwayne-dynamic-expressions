const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.Server(app);

const port = 3000;

app.use(express.static(path.resolve('./')));

server.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('Listening on port %s...', port);
  }
});
