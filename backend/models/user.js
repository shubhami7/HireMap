const { Model, DataTypes } = require('sequelize');
// const { Attribute, Table, PrimaryKey, NotNull } = require('@sequelize/core/decorators-legacy');

const sequelize = require('../config/database');

const tableName = 'users';

class User extends Model {}

sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
}, { tableName });


// User.init({
//     username: {
//         type: DataTypes.STRING
//     },
//     password: {
//         type: DataTypes.STRING
//     }
// }, {
//     sequelize,
//     modelName: "user"
// });

module.exports = User;