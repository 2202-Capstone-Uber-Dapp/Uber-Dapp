const router = require('express').Router();
const decodeToken = require('../auth');
const {
  models: { User },
} = require('../db/');

module.exports = router;

// GET /api/user/
router.get('/', decodeToken, async (req, res, next) => {
  try {
    const [user, hasCreatedUser] = await User.findOrCreate({
      where: { user_id: req.user },
    });
    res.json(user);
  } catch (err) {
    res.next(err);
  }
});

router.put('/', decodeToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user);
    const { email, role, wallet } = req.body;
    res.send(await user.update({ email, role, wallet }));
  } catch (err) {
    next(err);
  }
});
