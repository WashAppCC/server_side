const express = require('express');
const http = require('http');


const app = require("./app.js");


const port = 5000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});


