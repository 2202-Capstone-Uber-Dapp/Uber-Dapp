const admin = require('./firebase-config');

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
module.exports = decodeToken;
