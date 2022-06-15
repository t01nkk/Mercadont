const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('purchaseOrder', {
        orderId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productQuantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        country: {
            type: DataTypes.STRING,
            defaultValue: ""         
        },
        province: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        city: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        street: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        postalCode: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        paymentStatus: {
            type: DataTypes.ENUM("pending", "completed", "canceled"),
            defaultValue: "pending"
        },
        orderStatus: {
            type: DataTypes.ENUM("pending", "accepted", "rejected"),
            defaultValue: "pending"
        }
    },{timestamps: false}
    )
};