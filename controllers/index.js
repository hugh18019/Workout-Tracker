const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const exerciseRoutes = require('./exercise-routes');
const statRoutes = require('./stat-routes');

router.use('/', homeRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/stat', statRoutes);

module.exports = router;
