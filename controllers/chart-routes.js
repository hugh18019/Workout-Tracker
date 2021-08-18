const router = require('express').Router();
const db = require('../models');

router.get('/', async (req, res) => {
  res.render('chart');
});

router.get('/lastExercises', async (req, res) => {
  try {
    const lastWorkout = await db.Workout.find().sort({ _id: -1 }).limit(1);
    const exercises = await getExercises(lastWorkout);

    // console.log('workoutData', workoutData);
    console.log(exercises);

    const workoutObj = {
      lastWorkout: lastWorkout,
      exercises: exercises,
    };

    res.status(200).json(workoutObj);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

async function getExercises(lastWorkout) {
  return new Promise(async (resolve, reject) => {
    const exercises = [];
    for (let each of lastWorkout[0].exercises) {
      const exercise = await db.Exercise.findById(each);
      exercises.push(exercise);
    }
    resolve(exercises);
  });
}

module.exports = router;
