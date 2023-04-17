const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

//* ADD MOVIE
router.post('/', async (req, res) => {
    try {
        const { title, genre, releaseYear, poster, plot, ratings } = req.body; // Assuming the request body contains the necessary movie data

        // Create a new movie instance with the provided data
        const movie = new Movie({
            title,
            genre,
            releaseYear,
            plot,
            ratings
        });
        // Save the movie to the database
        const result = await movie.save();
        console.log(result);
        res.status(400).send(req.body); // Render a response indicating successful movie addition
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message); // Send an error response if movie addition fails
    }
});


//* Get Method
router.get('/', async (req, res) => {
    try {
        const movie = await Movie.find().select('-ratings._id -__v');
        console.log(movie);
        res.status(200).send(movie);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, genre, releaseYear, plot, ratings } = req.body;
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            {
                title,
                genre,
                releaseYear,
                plot,
                ratings
            },
            { new: true, runValidators: true }
        );
        if (!updatedMovie) {
            return res.status(404).send('Movie not found');
        }
        res.status(200).send(updatedMovie);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).send('Movie not found');
        }
        res.status(200).send('Movie deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router; 