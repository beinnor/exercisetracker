const Exercise = require('../models/exercise');
const User = require('../models/user');

// Add exercise
exports.exerciseAdd = [
  (req, res, next) => {
    User.findById(req.body.userId).exec()
      .then((result) => {
        const exerciseInstance = new Exercise(
          {
            description: req.body.description,
            duration: req.body.duration,
            date: req.body.date,
            username: result.username,
            userId: result._id
          });
        exerciseInstance.save(function (err) {
          if (err) return new Error(err);
        });
        res.json(exerciseInstance);
      })
      .catch((err) => { return next(err); });
  }
];

// Full exercise log of a user with an exercise count
exports.log = (req, res, next) => {
  const userid = req.query.userId;
  let from = req.query.from;
  let to = req.query.to;
  let query = { userId: userid };
  let limit = 0;

  if (from !== undefined) {
    from = new Date(from);
    query = { userId: userid, date: { $gte: from } };
  }
  if (to !== undefined) {
    to = new Date(to);
    to.setDate(to.getDate() + 1); // Add 1 day to include date
    if (from !== undefined) {
      query = { userId: userid, date: { $lte: to, $gte: from } };
    } else {
      query = { userId: userid, date: { $lte: to } };
    }
  }

  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  Exercise.find(query).limit(limit).exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => { return next(err); });
};
