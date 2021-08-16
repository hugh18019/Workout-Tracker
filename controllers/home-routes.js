const router = require('express').Router();

router.get('/', async (req, res) => {
  console.log('hit home-route');
  res.render('home');
});

module.exports = router;
