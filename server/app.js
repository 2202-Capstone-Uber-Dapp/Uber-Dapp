const path = require('path');
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const { sessionMiddleware } = require('./controller/serverController');
const app = express();
const cors = require('cors');
const server = http.createServer(app);
const SocketIOController = require('./controller/SocketIOController');
const corsConfig = {
  origin: 'https://young-everglades-26931.herokuapp.com/:8080',
  credentials: true,
};
const io = new Server(server, {
  cors: corsConfig,
});

module.exports = server;

// logging middleware
app.use(morgan('dev'));
// body parsing middleware
app.use(express.json());
// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors(corsConfig));

app.use(cookieParser());
app.use(sessionMiddleware);
// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);
SocketIOController(io);
// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});
// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
