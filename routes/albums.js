var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('albums', { title: 'DreamIt - Albums', page_title: 'Latest Albums' });
});

module.exports = router;
