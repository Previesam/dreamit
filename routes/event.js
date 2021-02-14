var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('event', { title: 'DreamIt - Events', page_title: 'Events' });
});

module.exports = router;
