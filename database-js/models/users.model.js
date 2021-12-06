const bcrypt = require('bcrypt')
const { DataTypes } = require('sequelize')

const sequelize = require('../db.config')

module.exports = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    set(value) {
      const defaultName = this.getDataValue('email').split('@')[0]
      return this.setDataValue('name', value ?? defaultName)
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      return this.setDataValue('password', bcrypt.hashSync(value, 10))
    },
  },
})
