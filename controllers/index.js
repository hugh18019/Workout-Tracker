const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const workoutRoutes = require('./workout-routes.js');
const exerciseRoutes = require('./exercise-routes');
const statRoutes = require('./stat-routes');

router.use('/', homeRoutes);
router.use('/workout', workoutRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/stat', statRoutes);

module.exports = router;
