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
    req.session.user_id;
    req.const[(user, hasCreatedUser)] = await User.findOrCreate({
      where: { user_id: req.user },
    });
    res.json(user);
  } catch (err) {
    res.next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user);
    const { email, role, wallet } = req.body;
    res.send(await user.update({ email, role, wallet }));
  } catch (err) {
    next(err);
  }
});
