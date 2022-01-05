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
      title: { type: Sequelize.STRING, allowNull: false }, // disallow null
      runtime: { type: Sequelize.INTEGER, allowNull: false }, // disallow null
      releaseDate: { type: Sequelize.DATEONLY, allowNull: false }, // disallow null , DATEONLY accepts a date value in yyyy-mm-dd format (DATE without time).
      isAvailableOnNetflix: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }, // disallow null, set default value
    },
    { sequelize } // same as { sequelize: sequelize }
  );
  return Movie;
};
