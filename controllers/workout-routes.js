const router = require('express').Router();
const db = require('../models');

router.get('/', async (req, res) => {
  try {
    const workoutData = await db.Workout.findAll({});

    res.status(200).json(workoutData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  //   console.log('got here');
  console.log(req.body);
  try {
    const workoutData = await db.Workout.create({
      date: req.body.date,
      isCurrent: req.body.isCurrent,
    });
    res.status(200).json(workoutData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
