const express = require('express');
const path = require('path');

// App
const app = express();

// Load routes
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');


app.use('/internal/', indexRoutes);
app.use('/users/', usersRoutes);


//profile .
app.use('/',express.static(path.join(__dirname, '../views/build/')));



module.exports = app;