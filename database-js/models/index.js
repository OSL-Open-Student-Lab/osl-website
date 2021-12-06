const Card = require('./cards.model')
const Booking = require('./facility_booking.model')
const EnterLog = require('./enter_log.model')
const Facility = require('./facilities.model')
const News = require('./news.model')
const User = require('./users.model')
const Device = require('./user_devices.model')
const Role = require('./user_roles.model')
const Type = require('./facility_type.model')

const sequelize = require('../db.config')

const NewsAuthor = sequelize.define('News_Author', {}, { timestamps: false })
const UserRoles = sequelize.define('User_Roles', {}, { timestamps: false })

User.belongsToMany(Role, { through: 'User_Roles' })
Role.belongsToMany(User, { through: 'User_Roles' })

User.belongsToMany(News, { through: 'News_Author' })
News.belongsToMany(User, { through: 'News_Author' })

User.hasMany(Device)
Device.belongsTo(User)

User.hasMany(Booking)
Booking.belongsTo(User)

User.hasOne(Card)
Card.belongsTo(User)

Facility.hasMany(Booking)
Booking.belongsTo(Facility)

Card.hasMany(EnterLog)
EnterLog.belongsTo(Card)

Type.hasMany(Facility)
Facility.belongsTo(Type)

module.exports = {
  NewsAuthor,
  Card,
  Booking,
  EnterLog,
  Facility,
  News,
  Role,
  Type,
  User,
  Device,
  UserRoles,
  sequelize
}
