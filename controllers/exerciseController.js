const Exercise = require('../models/exercise');
const User = require('../models/user');

// Add exercise
exports.exerciseAdd = [
  (req, res, next) => {
    const exerciseInstance = new Exercise(
      {
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
      });
    User.findByIdAndUpdate(req.body.userId,
      { $push: { exercises: exerciseInstance } },
      { safe: true, upsert: true, new: true }
    ).exec()
      .then((result) => {
        const outputResults = {
          username: result.username,
          _id: result._id,
          description: exerciseInstance.description,
          duration: exerciseInstance.duration,
          date: exerciseInstance.date
        };
        res.json(outputResults);
      })
      .catch((err) => { return next(err); });
  }
];

// Full exercise log of a user with an exercise count
exports.log = (req, res, next) => {
  const userid = req.query.userId;
  let from = req.query.from;
  let to = req.query.to;
  let projection;
  let query = { _id: userid };

  if (from !== undefined) {
    from = new Date(from);
  }
  if (to !== undefined) {
    to = new Date(to);
    to.setDate(to.getDate() + 1); // Add 1 day to include date
    query.exercises = { $elemMatch: { date: { $lte: to, $gte: from } } };
  }

  if (req.query.limit) {
    projection = {
      exercises: { $slice: [0, parseInt(req.query.limit)] }
    };
  } else {
    projection = {};
  }

  User.findOne(query, projection).exec()
    .then((user) => {
      user = user.toObject();

      const exerciseCount = user.exercises.length;
      user.exercises.forEach((exercise) => {
        delete exercise._id;
        exercise.date = exercise.date.toDateString();
      });
      user.count = exerciseCount;

      const outputUser = {
        _id: user._id,
        username: user.username,
        count: exerciseCount,
        log: user.exercises
      };
      return outputUser;
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => { return next(err); });
};
