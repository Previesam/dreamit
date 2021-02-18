const { request } = require("express");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("checkout", {
    title: "DreamIt - Checkout",
    page_title: "Checkout",
    items: req.body.items,
  });
  console.log("Okay");
});

module.exports = router;
