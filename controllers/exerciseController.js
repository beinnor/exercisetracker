const Exercise = require('../models/exercise');
const User = require('../models/user');

const minDate = '1950-01-01';
const maxDate = '2100-01-01';

// Add exercise
exports.exerciseAdd = [

  (req, res, next) => {
    if (new Date(req.body.date) > new Date(maxDate)) {
      return next(new Error('Maximum date allowed is 3000-01-01'));
    }
    if (new Date(req.body.date) < new Date(minDate)) {
      return next(new Error('Minimum date allowed is 1000-01-01'));
    }

    const exerciseInstance = new Exercise(
      {
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
      });

    if (exerciseInstance.date === null) {
      exerciseInstance.date = Date.now();
    }

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
          date: exerciseInstance.date.toDateString()
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
  let query = { _id: userid };
  let aggregate;

  if (from !== undefined) {
    from = new Date(from);
  } else {
    from = new Date(minDate);
  }
  if (to !== undefined) {
    to = new Date(to);
    to.setDate(to.getDate() + 1); // Add 1 day to include date
    query.exercises = { $elemMatch: { date: { $lte: to, $gte: from } } };
  } else {
    to = new Date(maxDate);
  }

  aggregate = [

    {
      $match: {
        '_id': userid
      }
    }, {
      $unwind: {
        path: '$exercises'
      }
    }, {
      $match: {
        'exercises.date': {
          $gt: new Date(from),
          $lt: new Date(to)
        }
      }
    }
  ];
  if (req.query.limit) {
    aggregate.push({
      '$limit': parseInt(req.query.limit)
    });
  }

  aggregate.push({
    $sort: {
      'exercises.date': 1
    }
  });

  aggregate.push({
    $group: {
      _id: '$_id',
      username: {
        '$first': '$username'
      },
      exercises: {
        '$push': '$exercises'
      }
    }
  });

  console.log(aggregate);

  User.findById(userid).exec()
    .then()
    .catch((err) => { return next(err); });

  User.aggregate(aggregate).exec()
    .then((user) => {
      const exerciseCount = user[0].exercises.length;
      user[0].exercises.forEach((exercise) => {
        delete exercise._id;
        exercise.date = exercise.date.toDateString();
      });
      user.count = exerciseCount;

      const outputUser = {
        _id: user[0]._id,
        username: user[0].username,
        count: exerciseCount,
        log: user[0].exercises
      };
      return outputUser;
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => { return next(err); });
};
