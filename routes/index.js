var express = require("express");
var router = express.Router();
const { verifyToken } = require('../config/verify.token');

/* GET home page. */
router.get("/", verifyToken, async function (req, res) {

  if (!res.locals.user) {
    return res.render("index", {
      title: "Dreamit Entertainment - Making Dreams Reality",
      user: res.locals.user,
    });
  }

  res.render("index", {
    title: "Dreamit Entertainment - Making Dreams Reality",
    user: res.locals.user,
  });
});

module.exports = router;
