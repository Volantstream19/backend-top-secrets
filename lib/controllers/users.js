const { Router } = require('express');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const UserService = require('../services/UserService');

module.exports = Router()
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await UserService.signIn({ email, password });

      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Logged in' });
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  })

  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      })
      .status(204)
      .send();
  });
