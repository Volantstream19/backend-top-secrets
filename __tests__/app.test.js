const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');
// const UserService = require('../lib/services/UserService');

const dumbUser = {
  email: 'Hello@example.com',
  password: 'SECRET PASSWORD',
};

// const login = async (userProps = {}) => {
//   const password = userProps.password ?? dumbUser.password;

//   const agent = request.agent(app);
//   const user = await UserService.create({ ...dumbUser, ...userProps });

//   const { email } = user;
//   await agent.post('/api/v1/users/sessions').send({ email, password });
//   return [agent, user];
// };

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

  it('POST /api/v1/users/sessions to log in a user', async () => {
    await request(app).post('/api/v1/users').send(dumbUser);
    const res = await request(app).post('/api/v1/users/sessions').send({
      email: 'Hello@example.com',
      password: 'SECRET PASSWORD',
    });
    expect(res.status).toEqual(200);
  });

  it('DELETE /api/v1/sessions signs out a user', async () => {
    const agent = request.agent(app);
    await UserService.create({ ...dumbUser });
    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'Hello@example.com', password: 'SECRET PASSWORD' });
    const resp = await agent.delete('/api/v1/users/sessions');
    expect(resp.status).toBe(204);
  });
});

afterAll(() => {
  pool.end();
});
