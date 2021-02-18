var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const moment = require("moment");
const Config = require("../config/settings.config.js");
const bcrypt = require("bcrypt");
const RefreshToken = require("../models/refresh-token.model.js");
const randtoken = require("rand-token");

/* GET login page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "DreamIt - Login", page_title: "Login" });
  console.log("Okay");
});

router.post("/", function (req, res, next) {
  var errors = [];

  if (!req.body.email || req.body.email.length < 3) {
    errors.push({
      message: "Email must contain a minimum of 3 characters",
    });
  }

  if (!req.body.password || req.body.password.length < 6) {
    errors.push({
      message: "Password must be at least 6 characters long",
    });
  }

  if (errors.length > 0) {
    return res.status(400).render("login", {
      title: "DreamIt - Login",
      page_title: "Login",
      errors,
      formData: req.body,
    });
  }

  User.findOne({ email: req.body.email })
    .then(async (data) => {
      if (data) {
        if (data && bcrypt.compareSync(req.body.password, data.hash)) {
          // Removing Hash from user information

          const { hash, ...userWithoutHash } = data.toObject();

          // Creating the refresh token

          const refreshToken = randtoken.uid(16);

          // Validation before adding new refresh token to db

          const _refresh = await RefreshToken.findOne({
            user: data.id,
          });

          if (_refresh) {
            // Creating the Token

            newRefresh = {
              issuedUtc: moment().unix(),
              expiresUtc: moment().add(4, "days").unix(),
              token: refreshToken,
              user: data.id,
              jwt: {
                // Creating the Token
                token: jwt.sign(
                  { sub: data.id, user: userWithoutHash },
                  Config.secret,
                  {
                    issuer: "http://localhost:3000",
                    expiresIn: "30m", // Expires in 1 minutes
                  }
                ),
                // Setting token expiry
                exp: moment().add(30, "m").unix(),
              },
            };

            await RefreshToken.findByIdAndUpdate(_refresh.id, newRefresh);

            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              sameSite: "strict",
            }).redirect("/");
          } else {
            // Create New Token Object
            const newToken = new RefreshToken({
              issuedUtc: moment().unix(),
              expiresUtc: moment().add(4, "days").unix(),
              token: refreshToken,
              user: data.id,
              jwt: {
                // Creating the Token
                token: jwt.sign(
                  { sub: data.id, user: userWithoutHash },
                  Config.secret,
                  {
                    issuer: "http://localhost:3000",
                    expiresIn: "30m", // Expires in 1 minutes
                  }
                ),
                // Setting token expiry
                exp: moment().add(30, "m").unix(),
              },
            });

            //Save the new token

            newToken.save();

            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              sameSite: "strict",
            }).redirect("/");
          }
        } else {
          errors.push({
            message: "Invalid Password please try again",
          });
          return res.status(400).render("login", {
            title: "DreamIt - Login",
            page_title: "Login",
            errors,
            formData: req.body,
          });
        }
      } else {
        errors.push({
          message: "Invalid email address please check",
        });
        return res.status(400).render("login", {
          title: "DreamIt - Login",
          page_title: "Login",
          errors,
          formData: req.body,
        });
      }
    })
    .catch((err) => {
      errors.push({
        message:
          err.message ||
          "Some error occurred while trying to log you in please try again later",
      });
      return res.status(500).render("login", {
        title: "DreamIt - Login",
        page_title: "Login",
        errors,
        formData: req.body,
      });
    });
});

module.exports = router;
