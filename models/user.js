const mongoose = require('mongoose');
const shortid = require('shortid');
const Exercise = require('../models/exercise');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    _id: {type: String, required: true, default: shortid.generate},
    username: {type: String, required: true, minlength: 3, maxlength: 20},
    exercises: [Exercise.schema],
    __v: { type: Number, select: false }
  }
);

// Export model
module.exports = mongoose.model('User', UserSchema);
