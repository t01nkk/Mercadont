const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            incremental: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        subcategories: {
            type: DataTypes.ARRAY(DataTypes.STRING(20))
        }
    });
}