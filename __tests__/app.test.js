const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const request = require('supertest');
// const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const dumbUser = {
  email: 'Hello@example.com',
  password: 'SECRET PASSWORD',
};

describe('', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('example test - delete me!', () => {
    expect(1).toEqual(1);
  });
  afterAll(() => {
    pool.end();
  });
});
