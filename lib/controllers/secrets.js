const { Router } = require('express');
const Secret = require('../models/Secrets.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const secrets = await Secret.getAll();
    res.json(secrets);
  } catch (e) {
    next(e);
  }
});
