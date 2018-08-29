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
