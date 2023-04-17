const express = require('express');
const app = express('/',);
const home = require('./routes/home');


//npm install --save express jade pug
//Use this to install pug view engine
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))