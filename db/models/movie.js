const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  // Movie model
  class Movie extends Sequelize.Model {}
  Movie.init(
    {
      // Set custom primary key column
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "title"',
          },
          notEmpty: {
            // custom error message
            msg: 'Please provide a value for "title"',
          },
        },
      }, // disallow null
      runtime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "runtime"',
          },
          min: {
            args: 1,
            msg: 'Please provide a value greater than "0" for "runtime"',
          },
        },
      }, // disallow null
      releaseDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "runtime"',
          },
          isAfter: {
            args: "1895-12-27",
            msg:
              'Please provide a value on or after "1895-12-28" for "releaseDate"',
          },
        },
      }, // disallow null , DATEONLY accepts a date value in yyyy-mm-dd format (DATE without time).
      isAvailableOnNetflix: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }, // disallow null, set default value
    },
    {
      modelName: "movie", // set any model name, it will be plural
      //or use tableName: 'my_movies_table', to change table name
      // disable plural table names 'freezeTableName: true'
      timestamps: false, // disable timestamps
      //paranoid: true - enable "soft" deletes, deleteAt value appears
      sequelize, // same as { sequelize: sequelize }
    }
  );
  return Movie;
};
