const { DataTypes } = require('sequelize')

const sequelize = require('../db.config')

module.exports = sequelize.define('Device', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
})
