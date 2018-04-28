const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

require('./src/config/')(app);
require('./src/config/database');
require('./src/route/route.index')(app);

server.listen(process.env.PORT||3000, ()=> {
    logger.info(`Server Started at ${process.env.PORT||3000}`)
})