const admin = require('firebase-admin');

const serviceAccount = require('../../devFirebaseAuthKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
