const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const UserService = require('../lib/services/UserService');

const dumbUser = {
  email: 'Hello@example.com',
  password: 'SECRET PASSWORD',
};

// const registerAndLogin = async (userProps = {}) => {
//   const password = userProps.password ?? dumbUser.password;

//   // Create an "agent" that gives us the ability
//   // to store cookies between requests in a test
//   const agent = request.agent(app);

//   // Create a user to sign in with
//   const user = await UserService.create({ ...dumbUser, ...userProps });

//   // ...then sign in
//   const { email } = user;
//   await agent.post('/api/v1/users/sessions').send({ email, password });
//   return [agent, user];
// };

describe('top-secret-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST { email, password } to /api/v1/users creates a new user', async () => {
    const res = await (await request(app).post('/api/v1/users')).send(dumbUser);
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
