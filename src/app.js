const express = require('express');
const path = require('path');

// App
const app = express();

// Load routes
const indexRoutes = require('./routes/index');
app.use('/internal/', indexRoutes);

//profile .
app.use('/',express.static(path.join(__dirname, '../views/build/')));



module.exports = app;