var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'DreamIt - Login', page_title: 'Login' });
  console.log('Okay');
});

module.exports = router;
