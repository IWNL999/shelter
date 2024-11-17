const Router = require('express');
const healthController = require('../controllers/healthController');
const router = new Router();

router.post('/', healthController.create);

module.exports = router;
