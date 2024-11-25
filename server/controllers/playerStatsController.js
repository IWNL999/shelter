const { PlayerStats } = require('../models/models'); // Импортируем модель PlayerStats

class PlayerStatsController {
    // Метод для получения всех характеристик игрока
    async getAll(req, res) {
        try {
            const stats = await PlayerStats.findAll(); // Получаем все записи из таблицы playerStats
            return res.json(stats); // Возвращаем данные в формате JSON
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении характеристик игрока' });
        }
    }

    // Метод для создания новой характеристики игрока
    async create(req, res) {
        try {
            const { playerId, statName, statValue } = req.body; // Извлекаем данные из тела запроса
            const newStat = await PlayerStats.create({ playerId, statName, statValue }); // Создаем новую запись
            return res.json(newStat); // Возвращаем созданную запись
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при добавлении характеристики игрока' });
        }
    }

    // Метод для получения характеристики по ID игрока
    async getByPlayerId(req, res) {
        try {
            const { playerId } = req.params; // Получаем playerId из параметров запроса
            const stats = await PlayerStats.findAll({ where: { playerId } }); // Ищем характеристики по playerId
            if (!stats || stats.length === 0) {
                return res.status(404).json({ message: 'Характеристики для данного игрока не найдены' });
            }
            return res.json(stats); // Возвращаем характеристики
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении характеристик игрока' });
        }
    }
}

module.exports = new PlayerStatsController();
