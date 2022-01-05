const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "movies.db",
  logging: false, // disable logging
});

// Movie model
class Movie extends Sequelize.Model {}
Movie.init(
  {
    title: Sequelize.STRING,
  },
  { sequelize } // same as { sequelize: sequelize }
);

// async IIFE
(async () => {
  // Sync all tables
  await sequelize.sync({ force: true });

  try {
    // Instance of the Movie class represents a database row
    const movieInstances = await Promise.all([
      Movie.create({
        title: "Toy Story",
      }),
      // New entry
      Movie.create({
        title: "The Incredibles",
      }),
    ]);
    const moviesJSON = movieInstances.map((movie) => movie.toJSON());
    console.log(moviesJSON);
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();
