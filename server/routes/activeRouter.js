const Router = require('express');
const activeController = require('../controllers/activeController');
const router = new Router();

router.post('/', activeController.create);

module.exports = router;
