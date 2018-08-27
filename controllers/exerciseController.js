const Exercise = require('../models/exercise');
const User = require('../models/user');

// Add exercise
exports.exerciseAdd = [
  function (req, res, next) {
    console.log('userId is: ' + req.body.userId);

    User.findById(req.body.userId).exec()
      .then((userFound) => {
        const exerciseInstance = new Exercise(
          {
            description: req.body.description,
            duration: req.body.duration,
            userid: userFound,
            date: req.body.date
          });
        console.log(userFound);
        console.log('--------------------');
        console.log(exerciseInstance);
        return exerciseInstance.save();
      })
      .then((savedExercise) => {
        res.json(savedExercise);
      })
      .catch((err) => { return next(err); });
  }
];
