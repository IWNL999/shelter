const Router = require('express');
const baggageController = require('../controllers/baggageController');
const router = new Router();

router.post('/', baggageController.create);

module.exports = router;
