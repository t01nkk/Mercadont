const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('review', {
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 1,
                max: 5
            }
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    },
    ),
        { timestamps: false }
};