const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('qa', {
        question: {
            type: DataTypes.TEXT,
            defaultValue: "",
        },
        answer:{
            type: DataTypes.TEXT,
            defaultValue: "",
        },
        resolved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }),
        {timestamps: false}
};