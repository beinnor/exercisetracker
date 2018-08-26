const User = require('../models/user');

// Add new user
exports.userAdd = [
  (req, res, next) => {
    const userInstance = new User(
      {
        username: req.body.username
      });
    // Check if username is available, if so create user, else send error message
    User.find({ username: userInstance.username }).exec()
      .then((result) => {
        if (result.length > 0) {
          return next(new Error('Username already taken'));
        } else {
          userInstance.save((err, result) => {
            if (err) { return next(err); }
            res.json({ name: result.username, id: result._id });
          });
        }
      })
      .catch((err) => { return next(err); });
  }
];
