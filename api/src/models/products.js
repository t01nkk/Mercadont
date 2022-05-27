const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      image: {
        // type: DataTypes.BLOB,
        type: DataTypes.STRING,
        // type: DataTypes.ARRAY(
        //     DataTypes.BLOB),
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      reviews: {
        type: DataTypes.ARRAY(
          DataTypes.JSON({
            user: DataTypes.STRING,
            text: DataTypes.STRING,
          })
        ),
      },
      qua: {
        type: DataTypes.ARRAY(
          DataTypes.JSON({
            question: DataTypes.STRING,
            answer: DataTypes.STRING,
          })
        ),
      },
    },
    { timestamps: false }
  );
};

// Posts ()
// Id. - NUMBER
// Name. - STRING
// Price.  - NUMBER
// Details. - STRING
// Rating. - NUMBER
// Image-
// Status (Active, Inactive). - BOOLEAN
// Stock. - NUMBER
// Reviews. - TUPLE [NUMBER & STRING]
// Questions and answers - TUPLE [ date, string, strings].
