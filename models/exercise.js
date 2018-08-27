const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema(
  {
    description: {type: String, required: true, minlength: 5, maxlength: 100},
    userid: {type: Schema.Types.ObjectId, ref: 'User', required: true},    
    duration: {type: Number, required: true},
    date: {type: Date, required: true}
  }
);

// Export model
module.exports = mongoose.model('Exercise', ExerciseSchema);
