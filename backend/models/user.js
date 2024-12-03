const { DataTypes, Model } = require('@sequelize/core');
const { Attribute, Table, PrimaryKey, NotNull } = require('@sequelize/core/decorators-legacy');

const sequelize = require('../config/database');

// @Table({
//     tableName: "users"
// })
class User extends Model {
    // @Attribute(DataTypes.STRING)
    // @PrimaryKey
    // userName;
  
    // @Attribute(DataTypes.STRING)
    // @NotNull
    // firstName;
  
    // @Attribute(DataTypes.STRING)
    // lastName;
}


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