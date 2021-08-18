const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const workoutRoutes = require('./workout-routes.js');
const exerciseRoutes = require('./exercise-routes');
const statRoutes = require('./stat-routes');
const chartRoutes = require('./chart-routes');

router.use('/', homeRoutes);
router.use('/workout', workoutRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/stat', statRoutes);
router.use('/chart', chartRoutes);

module.exports = router;
