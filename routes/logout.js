var express = require("express");
var router = express.Router();
var RefreshToken = require("../models/refresh-token.model");
const { getcookie } = require('../config/getcookie.helper');

/* GET home page. */
router.get("/", async function (req, res) {
  res.clearCookie("refreshToken");
  var cookie = getcookie(req);
  var path = cookie.path;
  if (cookie.path === '%2F') {
    path = '/'
  }
  await RefreshToken.findOneAndDelete({ token: cookie.refreshToken });
  return res.redirect(path);
});

module.exports = router;
