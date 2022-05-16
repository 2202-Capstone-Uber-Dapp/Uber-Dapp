const admin = require('./firebase-config');

async function createSession(req, res, next) {
  const token = req.headers.authorization ? getToken(req) : '';
  try {
    const sessionCookie = await createSessionCookie(token);
    res.cookie('FIREBASE', sessionCookie);
  } catch (e) {
    console.log(e);
    return res.json({ message: 'Internal Error' });
  }
}

async function verifySessionCookie(req, res, next) {
  const sessionCookie = req.cookies.session || '';
  try {
    const session = admin.auth().verifySessionCookie(sessionCookie);
    if (!session) return res.json({ message: 'Not Valid Session' });
    req.user = session;
  } catch (e) {
    console.log(e);
    return res.json({ message: 'Internal Error' });
  }
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
