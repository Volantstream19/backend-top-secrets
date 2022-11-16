const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const UserService = require('../lib/services/UserService');

const dumbUser = {
  email: 'Hello@example.com',
  password: 'SECRET PASSWORD',
};

describe('top-secret-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST  email, password  to /api/v1/users creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(dumbUser);
    const { email } = dumbUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
