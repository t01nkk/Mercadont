const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('review', {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5
            }
        },
        text: {
            type: DataTypes.TEXT,
            allowNull:false
        }

    },
    )
};