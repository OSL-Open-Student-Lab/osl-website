const { DataTypes } = require('sequelize')

const sequelize = require('../db.config')

module.exports = sequelize.define('EnterLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
})
