const Router = require('express');
const baggageRouter = require('./baggageRouter');
const activeRouter = require('./activeRouter');
const healthRouter = require('./healthRouter');
const characterRouter = require('./characterRouter');
const fact1Router = require('./fact1Router');
const fact2Router = require('./fact2Router');

const router = new Router();

router.use('/baggage', baggageRouter);
router.use('/active', activeRouter);
router.use('/health', healthRouter);
router.use('/character', characterRouter);
router.use('/fact1', fact1Router);
router.use('/fact2', fact2Router);

module.exports = router;
