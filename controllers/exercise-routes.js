const router = require('express').Router();
const db = require('../models');

router.get('/', async (req, res) => {
  res.render('exercise');
});

router.post('/', async (req, res) => {
  try {
    const exerciseData = await db.Exercise.create({
      type: req.body.type,
      name: req.body.name,
      weights: req.body.weights,
      sets: req.body.sets,
      reps: req.body.reps,
      duration: req.body.duration,
    });

    // const exercise = exerciseData.get({ plain: true });

    res.status(200).json(exerciseData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
