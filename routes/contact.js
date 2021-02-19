var express = require("express");
var router = express.Router();
var { verifyToken } = require("../config/verify.token");

var path = "contact";
var page_title = "Contact";
var title = "Dreamit - Contact";

/* GET home page. */
router.get("/", verifyToken, function (req, res, next) {
  
  if (!res.locals.user) {
    return res.cookie("path", path).render("contact", {
      title,
      page_title,
      user: res.locals.user,
    });
  }

  res
    .cookie("path", path)
    .render("contact", { title, page_title, user: res.locals.user });
});

module.exports = router;
