var express = require("express");
var router = express.Router();
var { verifyToken } = require('../config/verify.token');

var path = "event";
var page_title = "Events";
var title = "Dreamit - Events";

/* GET home page. */
router.get("/", verifyToken, function (req, res, next) {
  if (!res.locals.user) {
    return res.cookie("path", path).render("event", {
      title,
      page_title,
      user: res.locals.user,
    });
  }

  res
    .cookie("path", path)
    .render("event", { title, page_title, user: res.locals.user });
});

module.exports = router;
