const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    // Nombre * Vida Fuerza Defensa Velocidad Altura Peso
    sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: UUIDV4,
            unique: true,
            primaryKey: true
        },
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
        address: {
            type: DataTypes.JSON({
                country: DataTypes.STRING,
                province: DataTypes.STRING,
                city: DataTypes.STRING,
                street: DataTypes.STRING,
                postalCode: DataTypes.STRING,
            }),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        payment: {
            type: DataTypes.ARRAY(
                DataTypes.JSON({
                    user: DataTypes.STRING,
                    text: DataTypes.STRING,
                }))
        },
    },
    )
};
