const Router = require('express');
const baggageRouter = require('./baggageRouter');
const activeRouter = require('./activeRouter');
const healthRouter = require('./healthRouter');
const characterRouter = require('./characterRouter');
const fact1Router = require('./fact1Router');
const fact2Router = require('./fact2Router');
const fobiaRouter = require('./fobiaRouter');
const hobbyRouter = require('./hobbyRouter');
const professionRouter = require('./professionRouter');
const playerStatsRouter = require('./playerStatsRouter');

const router = new Router();

router.use('/baggage', baggageRouter);
router.use('/active', activeRouter);
router.use('/health', healthRouter);
router.use('/character', characterRouter);
router.use('/fact1', fact1Router);
router.use('/fact2', fact2Router);
router.use('/fobia', fobiaRouter);
router.use('/hobby', hobbyRouter);
router.use('/profession', professionRouter);
router.use('/playerStats', playerStatsRouter);

module.exports = router;
