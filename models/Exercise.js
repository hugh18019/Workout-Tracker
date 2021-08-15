const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: String,
  name: String,
  // for cardio
  distance: Number,
  // for resistance
  weights: Number,
  sets: Number,
  reps: Number,
  // common to cardio and resistance
  duration: Number,
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
