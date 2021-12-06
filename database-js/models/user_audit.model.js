const { DataTypes } = require('sequelize')

const sequelize = require('../db.config')

module.exports = sequelize.define('Audit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  action: {
    type: DataTypes.ENUM(['CREATED', 'DELETED', 'UPDATED']),
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recordId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
