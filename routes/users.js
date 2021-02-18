var express = require('express');
var router = express.Router();
const User = require('../models/user.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

    // // Route to create new user

    // app.post('/api/register', user.create);

    // // Route to authenticate user

    // app.post('/api/authenticate', user.authenticate);

    //  // Route to refresh user

    //  app.post('/api/refresh/:token', verifyToken, user.refresh);

    // // Route to get all users

    // app.get('/api/users', verifyToken, user.findAll);

    // // Route to get one user

    // app.get('/api/user/:Id', verifyToken, user.findOne);

    // // Route to assign role to user

    // app.post('/api/user/assignrole', verifyToken, user.assignRole);

    // // Route to update user

    // app.put('/api/user/:Id', verifyToken, user.update);

    // // Route to delete user

    // app.delete('/api/user/:Id', verifyToken, user.delete);

module.exports = router;
