const Router = require('express');
const router = new Router();
const FobiaController = require('../controllers/fobiaController');

// POST запрос для создания фобии/фобий
router.post('/', FobiaController.create);

// GET запрос для получения всех фобий
router.get('/', FobiaController.getAll);

// GET запрос для получения фобии по ID
router.get('/:id', FobiaController.getOne);

module.exports = router;
