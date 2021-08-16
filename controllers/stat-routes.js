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

module.exports = router;
