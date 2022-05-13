const path = require('path');
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio();
module.exports = server;

// logging middleware
app.use(morgan('dev'));

const users = {};
io.on('connection', (socket) => {
  socket.on('userConnected', () => {
    const { uid } = socket.handshake.query;
    if (users.hasOwnProperty(uid)) {
      rejoinRoom(uid);
    } else {
      SetUserInfo(uid, role, location);
    }
    console.log(users);
  });
  socket.on('userDisconnected', socket.leave(users[uid].role));
  socket.on('set-location', (uid, location) => {
    users[uid].location = location;
  });

  function SetUserInfo(uid) {
    const { role, location } = socket.handshake.query;
    users[uid] = { role, location };
    users[uid].room = role;
    socket.join(users[uid].room);
  }
  function rejoinRoom(uid) {
    socket.join(users[uid].room);
  }
});

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

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
