const { Sequelize } = require('sequelize')
const path = require('path')
const colors = require('colors')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve('database','data.sqlite'),
  logging: msg => console.log(colors.yellow.bold(msg))
})

module.exports = sequelize
