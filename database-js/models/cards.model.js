const { DataTypes } = require('sequelize')

const sequelize = require('../db.config')

module.exports = sequelize.define('Card', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
})
