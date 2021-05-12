const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./tests_helper');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');
const { test } = require('@jest/globals');

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Poppy',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails if username is not sufficient length', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'no',
      name: 'Superuser',
      password: 'passwordisfine',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'User validation failed: username: Path `username`'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails if password is not of sufficient length', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'usernameisfine',
      name: 'Superuser',
      password: 'no',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password too short');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe('creating a new user', () => {
  test('user with valid credentials can log in', () => {});
});

afterAll(() => {
  mongoose.connection.close();
});
