const { DataTypes } = require('sequelize')

const sequelize = require('../db.config')

module.exports = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    canBooking: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    canPostNews: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    haveAdminAccess: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { createdAt: false, updatedAt: false }
)
