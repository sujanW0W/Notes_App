const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../DB/connectDB");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Users",
        timestamps: true,
    }
);

sequelize.sync().then(() => console.log("Users table created Successfully."));

module.exports = User;
