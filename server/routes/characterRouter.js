const Router = require('express');
const characterController = require('../controllers/characterController');
const router = new Router();

router.post('/', characterController.create);

router.get('/', characterController.getAll);

router.get('/:id', characterController.getOne);

module.exports = router;
