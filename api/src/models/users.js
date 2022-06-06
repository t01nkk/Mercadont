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

      address: {
        type: DataTypes.JSON({
          country: DataTypes.STRING,
          province: DataTypes.STRING,
          city: DataTypes.STRING,
          street: DataTypes.STRING,
          postalCode: DataTypes.STRING,
        }),
        // allowNull: false,
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
      userCreated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },

    { timestamps: false }
  );
};
