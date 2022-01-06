const Sequelize = require("sequelize");
const { sequelize } = require("..");

module.exports = (sequelize) => {
  class Person extends Sequelize.Model {}
  Person.init(
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "firstName"',
          },
          notEmpty: {
            msg: 'Please provide a value for "firstName"',
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "lastName"',
          },
          notEmpty: {
            msg: 'Please provide a value for "lastName"',
          },
        },
      },
    },
    {
      tableName: "my_people_table",
      timestamps: false,
      sequelize, // same as { sequelize: sequelize
    }
  );
  return Person;
};
