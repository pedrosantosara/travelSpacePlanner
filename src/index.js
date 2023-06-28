const express = require('express');
const sequelize = require('./config/config.js');
const routes = require('./routes/travel-plans.js')

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000)



