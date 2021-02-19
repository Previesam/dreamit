var express = require("express");
var router = express.Router();
var { verifyToken } = require('../config/verify.token');

var page_title = "News"
var title = "DreamIt - News"
var path = "blog"

/* GET home page. */
router.get("/", verifyToken, function (req, res, next) {
  if (!res.locals.user) {
    return res.cookie("path", path).render("blog", {
      title,
      page_title,
      user: res.locals.user,
    });
  }

  res.cookie("path", path).render("blog", {
    title,
    page_title,
    user: res.locals.user,
  });
});

module.exports = router;
