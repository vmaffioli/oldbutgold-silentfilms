var express = require('express');
var router = express.Router();
var genres = require('../database/data/genresFilter')

// Genres Filter
genres.forEach(e => {
  router.get('/'+e[0], function(req, res, next) {
    res.json(e[1])
  });
});




module.exports = router;
