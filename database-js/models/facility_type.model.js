const { DataTypes } = require('sequelize')

const sequelize = require('../db.config')

module.exports = sequelize.define('Type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull:true,
  }
})
