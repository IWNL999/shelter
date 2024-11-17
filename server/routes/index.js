const Router = require('express');
const baggageRouter = require('./baggageRouter');
const activeRouter = require('./activeRouter');
const healthRouter = require('./healthRouter');

const router = new Router();

router.use('/baggage', baggageRouter);
router.use('/active', activeRouter);
router.use('/health', healthRouter);

module.exports = router;
