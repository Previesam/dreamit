var express = require("express");
var router = express.Router();
const { verifyToken } = require("../config/verify.token");

/* GET home page. */
router.get("/", verifyToken, function (req, res, next) {

  if (!res.locals.user) {
    return res.render("albums", {
      title: "DreamIt - Albums",
      user: res.locals.user,
    });
  }

  res.render("albums", {
    title: "DreamIt - Albums",
    page_title: "Latest Albums",
    user: res.locals.user,
  });
});

module.exports = router;
