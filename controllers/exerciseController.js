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
  User.findOne({_id: req.query.userId}).exec()
    .then((user) => {
      /* --- FORMAT OF OUTPUT ---
      {"_id":"Sknq5S-v7","username":"goblow","count":3,
        "log":[
          {"description":"lollinf","duration":4000,"date":"Sat Oct 10 2015"},
          {"description":"lollinf","duration":4000,"date":"Sat Oct 10 2015"},
          {"description":"lollinf","duration":4000,"date":"Sat Oct 10 2015"}
          ]
        }
      */
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

      console.log(outputUser);

      res.json(outputUser);
    })
    .catch((err) => { return next(err); });
};
