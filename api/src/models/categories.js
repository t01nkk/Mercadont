const { DataTypes, UUIDV4 } = require('sequelize');
//
module.exports = (sequelize) => {
    sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        img: {
            type: DataTypes.BLOB
        }
    },
        {timestamps:false})
}