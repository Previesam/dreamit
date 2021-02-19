var express = require("express");
var router = express.Router();
const { verifyToken } = require("../config/verify.token");

var page_title = 'Latest Albums'
var title = "DreamIt - Albums"
var path = "albums-store"

/* GET home page. */
router.get("/", verifyToken, function (req, res, next) {

  if (!res.locals.user) {
    return res.cookie("path", path).render("albums", {
      title,
      user: res.locals.user,
      page_title,
    });
  }

  res.cookie("path", path).render("albums", {
    title,
    page_title,
    user: res.locals.user,
  });
});

module.exports = router;
