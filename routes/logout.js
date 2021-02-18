var express = require("express");
var router = express.Router();
var RefreshToken = require("../models/refresh-token.model");

function getcookie(req) {
  const {
    headers: { cookie },
  } = req;
  if (cookie) {
    return cookie.split(";").reduce((res, item) => {
      const data = item.trim().split("=");
      return { ...res, [data[0]]: data[1] };
    }, {});
  }
  return {};
}

/* GET home page. */
router.get("/", async function (req, res) {
  res.clearCookie("refreshToken");
  var cookie = getcookie(req)
  await RefreshToken.findOneAndDelete({ token: cookie.refreshToken });
  return res.redirect("/");
});

module.exports = router;
