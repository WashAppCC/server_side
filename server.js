const app = require('./app.js');
const http = require('http');

const port= 5000;
const server = http.createServer(app);
server.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);




