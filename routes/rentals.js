const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');

// const Fawn = require('Fawn');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    console.log(customer);
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        dateOut: Date.now()
    });
    rental = await rental.save();
    movie.numberInStock--;
    movie.save();
    return res.send(rental);
    // try {
    //     new Fawn.Task()
    //         .save('rentals', rental)
    //         .update('movies', { _id: movie._id }, {
    //             $inc: {
    //                 numberInStock: -1
    //             }
    //         }).run();
    //     res.send(movie);
    // } catch (error) {
    //     res.status(500).send('Something failed.');
    // }
});

module.exports = router;



/* https://stackoverflow.com/questions/75398509/why-does-fawn-throwing-an-error-like-the-provided-mongoose-instance-is-invalid
 const session = await db.startSession();
try {
    await session.withTransaction(async () => {
      rental.save();
      decNumberInStock(movie._id)
      res.send(rental);
    });
  } finally {
    await session.endSession();
    await db.close();
    console.log('ok')
  } 
  */
