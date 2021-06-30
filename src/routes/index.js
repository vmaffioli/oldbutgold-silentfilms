var express = require('express');
var router = express.Router();



router.get('/test', function(req, res, next) {
  res.json([{id:1,nome:'luiz'}])
});

module.exports = router;
