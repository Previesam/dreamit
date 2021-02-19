var express = require("express");
var router = express.Router();
var { verifyToken } = require('../config/verify.token');

var page_title = "Cart"
var title = "Dreamit - Cart"
var qtyValue = 2
var itemAmount = 2000
var path = "cart"

/* GET home page. */
router.get("/", verifyToken, function (req, res, next) {

  if (!res.locals.user) {
    return res.cookie("path", path).render("cart", {
      title,
      page_title,
      qtyValue,
      itemAmount,
      user: res.locals.user,
    });
  }

  res.cookie("path", path).render("cart", {
    title,
    page_title,
    qtyValue,
    itemAmount,
    user: res.locals.user
  });
  console.log("Okay");
});

module.exports = router;
