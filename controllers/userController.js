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
          throw new Error('Username already taken');
        } else {
          return userInstance.save();
        }
      })
      .then((result) => {
        result = result.toObject();
        delete result.__v;
        delete result.exercises;
        res.json(result);
      })
      .catch((err) => { return next(err); });
  }
];

// list users
exports.listUsers = (req, res, next) => {
  User.find({}, 'username _id').exec()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => { return next(err); });
};
