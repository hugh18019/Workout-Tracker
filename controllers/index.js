const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const exerciseRoutes = require('./exercise-routes');

router.use('/', homeRoutes);
router.use('/exercise', exerciseRoutes);

module.exports = router;
