var mongoose = require('mongoose');

var User = require('../models/user');

module.exports = function(router) {
  // Routes
  var registerRoute = router.route('/register');

  registerRoute.post(function(req, res){
    var new_user = new User();
    new_user.typeID = req.body.typeID;
    new_user.description = req.body.description;
    new_user.name = req.body.name;
    new_user.email = req.body.email;
    new_user.phone_number = req.body.phone_number;
    new_user.address = req.body.address;
    new_user.city = req.body.city;
    new_user.state = req.body.state;
    new_user.zipcode = req.body.zipcode;
    new_user.location = req.body.loc; // Make sure its an array not a string
    new_user.start_hour = req.body.start_hour;
    new_user.start_minute = req.body.start_minute;
    new_user.end_hour = req.body.end_hour;    
    new_user.end_minute = req.body.end_minute;

    new_user.setPassword(req.body.password);
    User.create(new_user, function (err, user) {
      if (err){
        res.status(500);
        res.json({
          message: err,
          data: []
        });
      }else{
        var token = user.generateJwt();
        res.status(200);
        res.json({
          'token' : token,
          message: 'User is successfully registered',
          data: user
        });
      }
    });
  });

  return router;
};