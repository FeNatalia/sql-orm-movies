const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  // Movie model
  class Movie extends Sequelize.Model {}
  Movie.init(
    {
      title: Sequelize.STRING,
    },
    { sequelize } // same as { sequelize: sequelize }
  );
  return Movie;
};
