
// const { Sequelize, Model, DataTypes } = require('sequelize');
// const path = require('path')


// const sequelize = new Sequelize('sqlite:main.db');




// class User extends Model { }
// User.init({
//     lastName: { type: DataTypes.STRING, allowNull:false }, 
//     firstName:  { type: DataTypes.STRING, allowNull:false },
//     email:  { type: DataTypes.STRING, unique:true, allowNull:false },
//     password:  { type: DataTypes.STRING, allowNull:false },
//     isadmin:  { type: DataTypes.BOOLEAN, defaultValue: false }
// },
//     { sequelize, modelName: 'user' });


// module.exports = { sequelize, User };




const { Sequelize, Model, DataTypes } = require('sequelize');
const path = require('path')
const sequelize = new Sequelize('sqlite:main.db');


class User extends Model { }
User.init({
    lastName: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true },
    isadmin: { type: DataTypes.BOOLEAN, defaultValue: false }
    
},
    { sequelize, modelName: 'user' });






class Article extends Model { }
Article.init({
    text: { type: DataTypes.STRING, allowNull: false },
    imgArticle: { type: DataTypes.STRING, allowNull: true }


},
    { sequelize, modelName: 'Article' });

Article.belongsTo(User)
User.hasMany(Article)






class Comment extends Model { }
Comment.init({
    text: { type: DataTypes.STRING, allowNull: false },
    imgComment: { type: DataTypes.STRING, allowNull: true }
},

    { sequelize, modelName: 'Comment' });

Comment.belongsTo(User)
User.hasMany(Comment)


Comment.belongsTo(Article)
Article.hasMany(Comment)






module.exports = { sequelize, User, Article, Comment };