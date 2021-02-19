const jwt = require("jsonwebtoken");
const Config = require("../config/settings.config.js");
const moment = require("moment");
const RefreshToken = require("../models/refresh-token.model");
const { getcookie } = require('../config/getcookie.helper');

exports.verifyToken = async (req, res, next) => {
  // Retrieve Json Web Token from request header

  var cookie = await getcookie(req);

  if (cookie.refreshToken) {

    var refreshToken = await RefreshToken.findOne({
      token: cookie.refreshToken,
    });

    if (moment.unix(refreshToken.expiresUtc) > moment.now()) {
      jwt.verify(refreshToken.jwt.token, Config.secret, async (err, result) => {
        if (err) {
          await RefreshToken.findByIdAndUpdate(refreshToken.id, {
            jwt: {
              token: jwt.sign(
                { sub: result.id, user: result.user },
                Config.secret,
                {
                  issuer: "http://localhost:3000",
                  expiresIn: "30m", // Expires in 1 minutes
                }
              ),
              exp: moment().add(30, "m").unix(),
            },
          });

          res.locals.user = result.user;
          return next();
        }
        res.locals.user = result.user;
        return next();
      });
    } else {
        next();
    }
  } else {
      next();
  }
};
