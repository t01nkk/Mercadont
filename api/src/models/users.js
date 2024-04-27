const { DataTypes, UUIDV4, INTEGER } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        // allowNull: false,
        unique: true,
        primaryKey: true,
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
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      cart: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      userCreated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },

    { timestamps: false }
  );
};
