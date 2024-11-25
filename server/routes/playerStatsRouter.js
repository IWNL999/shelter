const Router = require('express').Router;
const playerStatsController = require('../controllers/playerStatsController');

const router = new Router();

// Получить все характеристики игроков
router.get('/', playerStatsController.getAll);

// Создать новую характеристику игрока
router.post('/', playerStatsController.create);

// Получить характеристики игрока по playerId
router.get('/:playerId', playerStatsController.getByPlayerId);

module.exports = router;
