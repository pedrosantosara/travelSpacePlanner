const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config");

const travelPlanner = sequelize.define('travelPlanner', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  travel_stops: {
    type: DataTypes.ARRAY(Sequelize.INTEGER),
    allowNull: false
  }
})

travelPlanner.sync({force: true})