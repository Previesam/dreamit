const jwt = require("jsonwebtoken");
const Config = require("../config/settings.config.js");
const moment = require("moment");
const RefreshToken = require("../models/refresh-token.model");
const { getcookie } = require("../config/getcookie.helper");

exports.verifyToken = async (req, res, next) => {
  // Retrieve Json Web Token from request header

  var cookie = await getcookie(req);

  if (cookie.refreshToken) {
    await RefreshToken.findOne({
      token: cookie.refreshToken,
    })
      .then((data) => {
        if (moment.unix(data.expiresIn) > moment.now()) {
          jwt.verify(
            data.access_token,
            Config.secret,
            async (err, result) => {
              if (err) {
                await RefreshToken.findByIdAndUpdate(data.id, {
                  access_token: jwt.sign(
                    { sub: result.id, user: result.user },
                    Config.secret,
                    {
                      issuer: "http://localhost:3000",
                      expiresIn: "1m", // Expires in 30 minutes
                    }
                  ),
                });

                res.locals.user = result.user;
                return next();
              }
              res.locals.user = result.user;
              return next();
            }
          );
        } else {
          return next();
        }
      })
      .catch((err) => {
        return res.status(401).redirect('/login');
      });
  } else {
    next();
  }
};
