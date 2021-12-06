const { DataTypes } = require('sequelize')

const sequelize = require('../db.config')

module.exports = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  annotation: {
    type: DataTypes.STRING,
  },
  pic: {
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue('pic', `/assets/news/${value}`)
    },
  },
})
