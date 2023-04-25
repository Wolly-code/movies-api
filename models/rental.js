const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                require: true,
                maxlength: 255,
                minlength: 3,
            }, isGold: {
                type: Boolean,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            }
        })
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
    }
    ,
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    });

    return schema.validate(rental);
}

exports.validate = validateRental;
exports.Rental = Rental;