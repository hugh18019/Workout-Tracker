const router = require('express').Router();
const db = require('../models');

router.get('/', async (req, res) => {
  res.render('stat');
});

module.exports = router;
