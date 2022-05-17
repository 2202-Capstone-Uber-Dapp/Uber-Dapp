const router = require('express').Router();
const { createSession, verifySessionCookie } = require('./authSession');
const {
  models: { User },
} = require('../db');

module.exports = router;


// GET /api/user/
router.post('/session', verifySessionCookie, async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    res.next(err);
  }
});


router.post('/login', createSession, async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', async (req, res, next) => {
  req.session.destroy();
  res.json({});
});
