var express = require("express");
var router = express.Router();
const { verifyToken } = require('../config/verify.token');

var path = '/';

title = "Dreamit Entertainment - Making Dreams Reality"

/* GET home page. */
router.get("/", verifyToken, async function (req, res) {

  if (!res.locals.user) {
    return res.cookie("path", path).render("index", {
      title,
      user: res.locals.user,
    });
  }

  res.cookie("path", path).render("index", {
    title,
    user: res.locals.user,
  });
});

module.exports = router;
