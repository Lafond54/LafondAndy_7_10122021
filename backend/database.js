const { Sequelize, Model, DataTypes } = require('sequelize');
const path = require('path')


const sequelize = new Sequelize('sqlite:main.db');




class User extends Model { }
User.init({
    lastName: { type: DataTypes.STRING },
    firstName:  { type: DataTypes.STRING },
    email:  { type: DataTypes.STRING, unique:true },
    password:  { type: DataTypes.STRING },
    isadmin:  { type: DataTypes.BOOLEAN, defaultValue: false }
},
    { sequelize, modelName: 'user' });


// (async () => {
//   await sequelize.sync();
//   const andy = await User.create({
//     username: 'andy',
//     birthday: new Date(1980, 6, 20)
//   });
//   console.log(andy.toJSON());
// })();

module.exports = { sequelize, User };