const  {Sequelize} = require('sequelize');

const connection = new Sequelize('travel_stops', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres'
});


module.exports = connection;