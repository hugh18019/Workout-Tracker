const router = require('express').Router();
const db = require('../models');

let lastSevenWorkoutObj = {};

router.get('/', async (req, res) => {
  // console.log('hit home-route');
  // res.render('home');
  try {
    const lastSeven = await db.Workout.aggregate([
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
        },
      },
      {
        $sort: { date: 1 },
      },
      {
        $limit: 7,
      },
    ]);

    console.log(lastSeven);

    if (lastSeven.length > 0) {
      await createLastSevenWorkoutObj();
      await populateLastSevenWorkoutObj(lastSeven);
      console.log(lastSevenWorkoutObj);
      res.render('home', { lastSevenWorkoutObj: lastSevenWorkoutObj });
    } else {
      res.render('home');
    }

    // res.status(200).json(lastSevenWorkoutObj);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

function createLastSevenWorkoutObj() {
  return new Promise((resolve, reject) => {
    lastSevenWorkoutObj = {
      lastWorkoutDate: '',
      totalWorkoutDuration: 0,
      exercisePerformed: 0,
    };
    resolve('Success');
  });
}

function populateLastSevenWorkoutObj(lastSeven) {
  return new Promise((resolve, reject) => {
    for (let each of lastSeven) {
      lastSevenWorkoutObj.totalWorkoutDuration += each.total_duration;
      lastSevenWorkoutObj.exercisePerformed += each.exercises.length;
    }
    lastSevenWorkoutObj.lastWorkoutDate = lastSeven[lastSeven.length - 1].date;
    resolve('Success');
  });
}

module.exports = router;
