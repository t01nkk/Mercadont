const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('adminUser', {
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.BLOB,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },  
    },
        { timestamps: true })
};
