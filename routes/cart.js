var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cart', { title: 'DreamIt - Cart', page_title: 'Cart', qtyValue: 1 });
  console.log('Okay');
});

module.exports = router;
