const router = require("express").Router();
const decodeToken = require("../auth");
const {
  models: { Ride, User },
} = require("../db/");

//Do we need to use decodeToken here?
//what is decodeToken?

module.exports = router;
//  Here we are "mounted on" (starts with) /api/ride

//Creating initial Ride request
router.post("/:userId", async (req, res, next) => {
  //Req.body = {estTime, distTraveled, cost}
  //riderUserId will be ==> req.params.userId
  try {
    let { userId } = req.params;
    let rideRequest = await Ride.create(req.body);
    const user = await User.findOne({ where: { user_id: userId } });
    await rideRequest.setRider(user);
    res.status(201).json(rideRequest);
  } catch (error) {
    next(error);
  }
});

// Updating isCompleted bool to true once driver accepts
router.put("/:userId", async (req, res, next) => {
  try {
    let { rideId } = req.body;
    let { userId } = req.params;
    const ride = await Ride.findByPk(rideId);
    const user = await User.findOne({ where: { user_id: userId } });
    await ride.setDriver(user);
    res.send(await ride.update({ isCompleted: true }));
  } catch (err) {
    next(err);
  }
});
