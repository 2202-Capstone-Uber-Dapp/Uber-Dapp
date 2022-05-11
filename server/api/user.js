const router = require('express').Router();
// const decodeToken = require('../auth');
const {
  models: { User },
} = require('../db/');

module.exports = router;

//GET /api/user
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/user/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const profile = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    res.json(profile);
  } catch (err) {
    next(err);
  }
});
router.put('/:userId', async (req, res, next) => {
  try {
    const userUpdate = await User.findByPk(req.params.userId);
    const { email, role, wallet } = req.body;
    res.send(await userUpdate.update({ email, role, wallet }));
  } catch (err) {
    next(err);
  }
});
