const { Router } = require('express');
const { Quote } = require('../models/Quote');

module.exports = Router().post('/', async (req, res) => {
  const quote = await Quote.insert({ ...req.body });
  res.json(quote);
});

