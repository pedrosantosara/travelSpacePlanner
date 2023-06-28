const express = require('express');

const routes = express();

routes.get('/travel-plans', (req, res) => {
  res.send('Hello World!');
});

module.exports = routes;