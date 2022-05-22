const router = require('express').Router();
const { createSession, verifySessionCookie } = require('../auth/authSession');
const {
  models: { User },
} = require('../db/');

module.exports = router;
router.use(verifySessionCookie);
// GET /api/user/
router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.user_id);
    const { email, role, wallet , username} = req.body;
    res.send(await user.update({ email, role, wallet, username }));
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { data } = await User.findOne({
      where: {
        user_id: req.user,
      },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { uid, displayName } = req.body.user;
    const user = await User.create({
      user_id: uid,
      username: displayName,
      role: req.body.role,
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});
