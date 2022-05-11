'use strict';

const {
  db,
  models: { User, Ride },
} = require('../server/db');

const users = [
  {
    username: "mark",
    password: "mark_pw",
    email: "mark@gmail.com",
    role: "DRIVER",
  },
  {
    username: "brian",
    email: "brian@gmail.com",
    password: "brian_pw",
    role: "RIDER",
  },
  {
    username: "frank",
    email: "frank@gmail.com",
    password: "frank_pw",
    role: "DRIVER",
  },
  {
    username: "john",
    email: "john@gmail.com",
    password: "john_pw",
    role: "RIDER",
  },
  {
    username: "erik",
    email: "erik@gmail.com",
    password: "erik_pw",
    role: "DRIVER",
  },
];

async function seed() {
  await db.sync({ force: true });

  await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );

  const rider1 = await User.create({
    username: 'testingRide',
    email: 'rider@gmail.com',
    password: 'rider_pw',
    role: 'DRIVER',
  });
  const driver1 = await User.create({
    username: 'testingdriver',
    email: 'driver@gmail.com',
    password: 'driver_pw',
  });
  const ride1 = await Ride.create();
  await ride1.setDriver(driver1);
  await ride1.setRider(rider1);

  console.log('db synced!');
  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
