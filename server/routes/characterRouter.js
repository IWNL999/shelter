const Router = require('express');
const characterController = require('../controllers/characterController');
const router = new Router();

router.post('/', characterController.create);

module.exports = router;
