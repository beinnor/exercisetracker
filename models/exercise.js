const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema(
  {
    description: {type: String, required: true, minlength: 5, maxlength: 100},
    duration: {type: Number, required: true},
    date: {type: Date, required: true, default: Date.now}
  }
);

// Export model
module.exports = mongoose.model('Exercise', ExerciseSchema);
