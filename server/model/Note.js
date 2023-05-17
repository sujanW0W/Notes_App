const sequelize = require("../DB/connectDB");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./User");

const Note = sequelize.define(
    "Note",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        tableName: "Notes",
        timestamps: true,
    }
);

sequelize.sync().then(() => console.log("Notes table created successfully."));

module.exports = Note;
