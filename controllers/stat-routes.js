const router = require('express').Router();
const db = require('../models');

router.get('/', async (req, res) => {
  try {
    const workoutData = await db.Workout.find({});

    res.render('stat', workoutData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/lastSeven', async (req, res) => {
  try {
    const exer = await db.Workout.aggregate([
      {
        $lookup: {
          from: 'exercises',
          localField: 'exercises',
          foreignField: '_id',
          as: 'lookup-data',
        },
      },
      {
        $addFields: {
          total_duration: {
            $sum: '$lookup-data.duration',
          },
          total_weights: {
            $sum: '$lookup-data.weights',
          },
          total_sets: {
            $sum: '$lookup-data.sets',
          },
          total_reps: {
            $sum: '$lookup-data.reps',
          },
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $limit: 7,
      },
    ]);

    lastSevenWorkoutObj = {
      totalWorkoutDuration: 0,
      exercisePerformed: 0,
      totalWeightsLifted: 0,
      totalSetsPerformed: 0,
      totalRepsPerformed: 0,
    };

    for (let each of exer) {
      console.log(each.exercises.length);
      console.log(typeof each.exercises.length);
      lastSevenWorkoutObj.totalWorkoutDuration += each.total_duration;
      lastSevenWorkoutObj.exercisePerformed += each.exercises.length;
      lastSevenWorkoutObj.totalWeightsLifted += each.total_weights;
      lastSevenWorkoutObj.totalSetsPerformed += each.total_sets;
      lastSevenWorkoutObj.totalRepsPerformed += each.total_reps;
    }

    // console.log(lastSevenWorkoutObj);

    res.status(200).json(exer);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
