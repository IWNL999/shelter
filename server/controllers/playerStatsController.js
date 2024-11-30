const { PlayerStats, 
    Fobia_card,  
    Character_card,
    Health_card,
    Hobby_card,
    Profession_card,
    Fact1_card,
    Fact2_card,
    Fobia_card,
    Baggage_card,
    Character_card,
    Active_card,} = require('../models/models');
const jwt = require('jsonwebtoken');
const sequelize = require('../db')

class PlayerStatsController {
    // Метод для создания новой характеристики игрока
    async create(req, res) {
        try {
            const { playerId } = req.body; // Извлекаем playerId из тела запроса
    
            // Получаем случайную фобию из таблицы Fobia_card
            const randomFobia = await Fobia_card.findOne({
                order: sequelize.random(), // Используем RANDOM() для выбора случайной записи
            });
            if (!randomFobia) {
                return res.status(404).json({ message: 'Фобии не найдены в базе данных' });
            }

            // Получаем случайный характер из таблицы Character_card
            const randomCharacter = await Character_card.findOne({
                order: sequelize.random(),
            });
            if (!randomCharacter) {
                return res.status(404).json({ message: 'Характеры не найдены в базе данных' });
            }

            const randomHealth = await Health_card.findOne({
                order: sequelize.random(),
            });
            if (!randomHealth) {
                return res.status(404).json({ message: 'Характеры не найдены в базе данных' });
            }

            const randomHobby = await Hobby_card.findOne({
                order: sequelize.random(),
            });
            if (!randomHobby) {
                return res.status(404).json({ message: 'Характеры не найдены в базе данных' });
            }
    
            // Создаём новую запись в таблице PlayerStats
            const newStat = await PlayerStats.create({
                fobia: randomFobia.name, // Записываем название фобии
                character: randomCharacter.name, // Записываем название характера
                health: randomHealth.name,
                hobby: randomHobby
            });
    
            return res.json(newStat); // Возвращаем созданную запись
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при добавлении характеристики игрока' });
        }
    }

    // Метод для получения характеристики по ID игрока
    async getByPlayerId(req, res) {
        try {
            const { playerId } = req.params;

            // Извлекаем id пользователя из токена
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: 'Нет токена авторизации' });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Проверяем, что пользователь может получить данные только о своём игроке
            if (decoded.id !== parseInt(playerId)) {
                return res.status(403).json({ message: 'У вас нет доступа к этому игроку' });
            }

            const stats = await PlayerStats.findAll({ where: { id: playerId } });
            if (!stats || stats.length === 0) {
                return res.status(404).json({ message: 'Характеристики для данного игрока не найдены' });
            }
            return res.json(stats);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении характеристик игрока' });
        }
    }
}

module.exports = new PlayerStatsController();
