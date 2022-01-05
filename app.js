const db = require("./db");
const { Movie } = db.models;

// async IIFE
(async () => {
  // Sync all tables
  await db.sequelize.sync({ force: true });

  try {
    // Instance of the Movie class represents a database row
    const movieInstances = await Promise.all([
      Movie.create({
        title: "Toy Story",
        runtime: 81,
        releaseDate: "1995-11-22",
        isAvailableOnNetflix: true,
      }),
      // New entry
      Movie.create({
        title: "The Incredibles",
        runtime: 115,
        releaseDate: "2004-04-14",
        isAvailableOnNetflix: false,
      }),
    ]);
    const moviesJSON = movieInstances.map((movie) => movie.toJSON());
    console.log(moviesJSON);
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();
