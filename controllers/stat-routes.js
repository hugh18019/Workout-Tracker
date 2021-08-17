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
    const workoutData = await db.Workout.find().sort('date').limit(7);
    // console.log(workoutData);

    // for (var each of workoutData) {
    //   // each.exercises.aggregate([
    //   //   { $group: { _id: null, amount: { $sum: '$weights' } } },
    //   // ]);
    //   for (let j of each.exercises) {
    //     console.log(j);
    //   }
    // }

    // const exer = workoutData[0].exercises;
    // db.exer.aggregate([
    //   {
    //     $addFields: {
    //       totalWeights: { $sum: '$weights' },
    //     },
    //   },
    // ]);

    // const exer = db.Exercise.aggregate([
    //   {
    //     $project: {
    //       weights: {
    //         $cond: { if: { $in: ['$id', workoutData[0].exercises] } },
    //       },
    //     },
    //   },
    // ]);

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
          'Total Weights': {
            $sum: '$lookup-data.weights',
          },
        },
      },
      // { $project: { 'lookup-data': 0 } },
    ]);

    res.status(200).json(exer);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
