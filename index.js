const express = require('express');
const app = express('/',);
const home = require('./routes/home');
const mongoose = require('mongoose');
const movies = require('./routes/movies');

mongoose.connect('mongodb://127.0.0.1:27017/movies')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });

//npm install --save express jade pug
//Use this to install pug view engine
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home);
app.use('/movies', movies);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))