const admin = require('./firebase-config');

async function createSession(req, res, next) {
  const token = req.headers.authorization ? getToken(req) : '';
  try {
    const sessionCookie = await createSessionCookie(token);
    if (!sessionCookie)
      return res.json({ message: 'Failed to create session' });
    const session = await admin.auth().verifySessionCookie(sessionCookie);
    req.session.user_id = session.user_id;
    req.session.sessionCookie = sessionCookie;
    return verifySession(req, res, next);
  } catch (e) {
    return res.json({ message: 'Internal Error' });
  }
}

async function verifySessionCookie(req, res, next) {
  let sessionCookie = req.session ? req.session.sessionCookie : null;
  if (sessionCookie) {
    try {
      sessionCookie = await admin.auth().verifySessionCookie(sessionCookie);
      if (!sessionCookie) return res.json({ message: 'Not Valid Session' });
    } catch (e) {
      return res.json({ message: 'Internal Error' });
    }
  }
  req.user = sessionCookie;
  return next();
}

async function decodeToken(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue.user_id;
      return next();
    }
    return res.json({ message: 'Unauthorize Request' });
  } catch (e) {
    return res.json({ message: 'Internal Error' });
  }
}

module.exports = { decodeToken, createSession, verifySessionCookie };

function createSessionCookie(token) {
  const expiresIn = 1000 * 60 * 60 * 24 * 5;
  return admin.auth().createSessionCookie(token, { expiresIn });
}

function getToken(req) {
  return req.headers.authorization.split(' ')[1];
}

function verifyIdToken(token) {
  return admin.auth().verifyIdToken(token);
}
