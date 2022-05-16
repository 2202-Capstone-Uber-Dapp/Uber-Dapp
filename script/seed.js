'use strict';

const {
  db,
  models: { User, Ride },
} = require('../server/db');

const users = [
  // password: "mark_pw",
  // email: "mark@gmail.com",
  {
    user_id: 'BWKMhdnhpbT47CJgLUMV6D7e4p03',
    username: 'mark',
    role: 'DRIVER',
  },
  // email: "brian@gmail.com",
  // password: "brian_pw",
  {
    user_id: 'Lf8DneODtBU9ewrw11LXUA8tguE2',
    username: 'brian',
    role: 'RIDER',
  },
  // email: 'frank@gmail.com',
  // password: 'frank_pw',
  {
    user_id: 'sCyaWWTnJEYAqBW9v1YvSwWY6wK2',
    username: 'frank',
    role: 'DRIVER',
  },
  // email: 'john@gmail.com',
  // password: 'john_pw',
  {
    user_id: 'pOty1mOnGAbj69EfYO3QB5K3EyN2',
    username: 'john',
    role: 'RIDER',
  },
  // email: 'erik@gmail.com',
  // password: 'erik_pw',
  {
    user_id: 'fJamLiMrByUrgh5s6dkeXSTP3GU2',
    username: 'erik',
    role: 'DRIVER',
  },
];

async function seed() {
  await db.sync({ force: true });

  await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );

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
