const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('qa', {
        question: {
            type: DataTypes.TEXT,
        },
        answer:{
            type: DataTypes.TEXT,
        },
        resolved: {
            type: DataTypes.BOOLEAN,
            default: false,
        }
    }),
        {timestamps: false}
};