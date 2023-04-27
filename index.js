const express = require('express');
const app = express('/',);

require('./start/logger');
require('./start/router')(app);
require('./start/db')();
require('./start/config')();


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))