var express = require('express');
var router = express.Router();
const User = require('../models/user.model.js');
const Roles = require('../models/role.model.js');
const axios = require('axios');

// All Imports


const bcrypt = require('bcrypt');
const RoleType = require('../config/roles.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'DreamIt - Sign Up', page_title: 'Sign Up' });
  console.log('Okay');
});

// Method for creating new user

router.post('/', (req, res, next) => {

    let errors = [];

    // Validating entered data

    if (!req.body.firstname || req.body.firstname.length < 3) {
        errors.push({
            message: "First name must be at least 3 characters long"
        });
    }

    if (!req.body.lastname || req.body.lastname.length < 3) {
        errors.push({
            message: "Last name must be at least 3 characters long"
        });
    }

    if (!req.body.email || req.body.email.length < 3) {
        errors.push({
            message: "Email must be atleast 3 characters long"
        });
    }

    if (!req.body.phone || req.body.phone.length < 11) {
      errors.push({
          message: "Phone number must be atleast 11 characters long"
      });
    }

    if (!req.body.password || req.body.password.length < 6) {
        errors.push({
            message: "Password must be atleast 6 characters long"
        });
    }

    if (req.body.password !== req.body.confirmPassword) {
        errors.push({
            message: "Password and password confirmation does not match"
        });
    }

    

    if (errors.length > 0) {
      return res.status(400).render('signup', 
      { 
        title: 'DreamIt - Sign Up', 
        page_title: 'Sign Up', errors, 
        formData: req.body
      })
    }

    // Check if user already exist

    User.find({ email: req.body.email })
        .then(async data => {
            if (data.length > 0) {
                errors.push({
                  message: "User with email " + req.body.email + " already exist"
                });
                return res.status(400).render('signup', 
                  { 
                    title: 'DreamIt - Sign Up', 
                    page_title: 'Sign Up', errors, 
                    formData: req.body
                  });
            } else {

                // Create new user object

                const user = new User({
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  email: req.body.email,
                  phone: req.body.phone,
                });

                // Password Encryption

                // bcrypt.genSalt(SALT_WORK_FACTOR, salt => {
                //     bcrypt.hash(req.body.password, salt, hashedPassword => {
                //         user.hash = hashedPassword;
                //     });
                // });

                // // Add to Role User
                // const _role = await Roles.findOne({
                //     roleName: RoleType.User
                // });

                // if (!_role) {
                //     return res.status(400).send('Default role not available for user');
                // }

                // user.roles.push(_role.roleName);

                user.hash = bcrypt.hashSync(req.body.password, 10);

                // Save the new user
                user.save()
                    .then(data => {
                        return res.render('signup', {
                            message: "Your account was created successfully..."
                        });
                    })
                    .catch(err => {
                        errors.push({
                          message: err.message || "An unknown error occurred why trying to create your account."
                        })
                        return res.status(500).render('signup', { 
                          title: 'DreamIt - Sign Up', 
                          page_title: 'Sign Up', errors, 
                          formData: req.body
                        });
                    });
            }
        })
        .catch(err => {
          errors.push({
            message: err.message || "An unknown error occurred why trying to check if user exist."
          })
          return res.status(500).render('signup', { 
            title: 'DreamIt - Sign Up', 
            page_title: 'Sign Up', errors, 
            formData: req.body
          });
        });

});

module.exports = router;
