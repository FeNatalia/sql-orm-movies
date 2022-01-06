const db = require("./db");
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

// async IIFE
(async () => {
  // Sync all tables
  await db.sequelize.sync({ force: true });

  try {
    // Instance of the Movie class represents a database row
    /*CREATE*/
    const movieInstances = await Promise.all([
      Movie.create({
        title: "Boy Story",
        runtime: 81,
        releaseDate: "1995-11-22",
        isAvailableOnNetflix: true,
      }),
      // New entry
      Movie.create({
        title: "Three Incredibles",
        runtime: 115,
        releaseDate: "2004-04-14",
        isAvailableOnNetflix: false,
      }),
      Movie.create({
        title: "Human Story",
        runtime: 90,
        releaseDate: "1998-11-22",
        isAvailableOnNetflix: true,
      }),
    ]);
    const person = await Person.build({
      firstName: "Natalia",
      lastName: "Fedorova",
    });
    person.lastName = "Fedor";
    await person.save();

    const moviesJSON = movieInstances.map((movie) => movie.toJSON());
    console.log("Movies added: ", moviesJSON, "People added:", person.toJSON());

    /*READ*/
    const movies = await Movie.findAll({
      attributes: ["id", "title"], // return only id and title
      where: {
        isAvailableOnNetflix: true,
        title: {
          [Op.endsWith]: "story", // or [Op.startsWith]: "Boy"
        },
        releaseDate: {
          [Op.gte]: "1990-01-01", // greater than or equal to the date
        },
        runtime: {
          [Op.gt]: 80, // greater than 80, can also [Op.between]: [75, 115]
        },
      },
      order: [["releaseDate", "ASC"]], // in ASCending order: the dates are in order from earliest to latest release, can change to DESC
    }); // Find all movies available on netflix or SQL: SELECT * FROM Movies WHERE isAvailableOnNetflix = true;

    const movieByRuntime = await Movie.findOne({ where: { runtime: 81 } }); // Find the first one where

    const movieById = await Movie.findByPk(2); // Find by primary key
    const movieById1 = await Movie.findByPk(1);

    /*UPDATE*/
    movieById.isAvailableOnNetflix = true;
    await movieById.save(); // or instead of these 2 lines: movieById.update({isAv... :true})
    await movieById1.update(
      {
        title: "Toy Story",
        isAvailableOnNetflix: false,
      },
      { fields: ["title", "isAvailableOnNetflix"] } // The fields property sets which attributes are allowed to be updated and saved
    );

    /* READ after UPDATE*/
    const allMovies = await Movie.findAll();

    console.log(
      "Updated movies: ",
      movieById.get({ plain: true }),
      movieById1.get({ plain: true })
    );

    console.log(
      "All available movies after updates:",
      allMovies.map((movie) => movie.toJSON())
    );
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw error;
    }
  }
})();
