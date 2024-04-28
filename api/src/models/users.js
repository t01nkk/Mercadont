const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            password: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
                // allowNull: false
            },
            lastname: {
                type: DataTypes.STRING,
                // allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            country: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            province: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            city: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            street: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            postalCode: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            image: {
                type: DataTypes.STRING,
                // allowNull: false
            },
            payment: {
                type: DataTypes.ARRAY(
                    DataTypes.JSON({
                        user: DataTypes.STRING,
                        text: DataTypes.STRING,
                    })
                ),
            },
            banned: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            role: {
                // 0 registered - banned - admin
                type: DataTypes.ENUM('0', '1', '2'),
            },
            cart: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
            userCreated: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },

        { timestamps: false }
    );
};
