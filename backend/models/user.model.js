module.exports = (sequelize, Sequelize) => {
 const User = sequelize.define('user', {
  id: {
   type: Sequelize.INTEGER,
   autoIncrement: true,
   primaryKey: true,
  },
  username: {
   type: Sequelize.STRING,
   unique: true,
   allowNull: false,
  },
  email: {
   type: Sequelize.STRING,
   unique: true,
   allowNull: false,
   validate: {
    isEmail: true,
   },
  },
  password: {
   type: Sequelize.STRING,
   allowNull: false,
  },
 })

 return User
}
