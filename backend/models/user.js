const { Model, DataTypes } = require("@sequelize/core");
const sequelize = require("../config/database");

class User extends Model {}

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