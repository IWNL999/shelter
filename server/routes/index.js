const Router = require('express');
const baggageRouter = require('./baggageRouter');
// Добавляйте другие руты по мере необходимости

const router = new Router();

router.use('/baggage', baggageRouter);
// Добавляйте другие руты по мере необходимости

module.exports = router;
