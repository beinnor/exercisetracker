const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema(
  {
    description: {type: String, required: true, minlength: 5, maxlength: 100},
    duration: {type: Number, required: true},
    date: {type: Date, required: true, default: Date.now},
    username: {type: String, required: true, minlength: 3, maxlength: 20},
    userId: {type: String, ref: 'User'},
    __v: { type: Number, select: false }
  }
);

// Export model
module.exports = mongoose.model('Exercise', ExerciseSchema);
