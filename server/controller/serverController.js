const session = require('express-session');
// const MemoryStore = require('express').session.MemoryStore;
const sessionMiddleware = session({
  secret: 'trolololo',
  credentials: true,
  name: 'firebase_session',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.ENVIRONMENT === 'production' ? 'true' : 'auto',
    httpOnly: true,
    expires: 1000 * 60 * 60 * 24 * 5,
    sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
  },
});

const wrap = (expressMiddleware) => (socket, next) =>
  expressMiddleware(socket.request, {}, next);
module.exports = { sessionMiddleware, wrap };
