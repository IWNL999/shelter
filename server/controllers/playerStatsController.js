const { PlayerStats, 
    Fobia_card,  
    Character_card,
    Health_card,
    Hobby_card,
    Profession_card,
    Fact1_card,
    Fact2_card,
    Baggage_card,
    Active_card,} = require('../models/models');
const jwt = require('jsonwebtoken');
const sequelize = require('../db')
class PlayerStatsController {
    // Метод для создания новой характеристики игрока
    async create(req, res) {
        try {
            // Генерация случайного возраста (от 18 до 90 лет)
            const randomAge = Math.floor(Math.random() * (90 - 18 + 1)) + 18;

            // Функция для генерации случайного опыта (от 18 до возраста игрока)
            const randomExperience = (minAge, maxAge) => {
                return Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
            };

            // Получаем случайные карты
            const randomFobia = await Fobia_card.findOne({ order: sequelize.random() });
            const randomCharacter = await Character_card.findOne({ order: sequelize.random() });
            const randomHealth = await Health_card.findOne({ order: sequelize.random() });
            const randomHobby = await Hobby_card.findOne({ order: sequelize.random() });
            const randomProfession = await Profession_card.findOne({ order: sequelize.random() });

            // Проверка на наличие карт
            if (!randomFobia || !randomCharacter || !randomHealth || !randomHobby || !randomProfession) {
                return res.status(404).json({ message: 'Не все данные карт найдены в базе' });
            }

            // Генерация опыта для хобби и профессии
            const hobbyExperience = randomExperience(18, randomAge);
            const professionExperience = randomExperience(18, randomAge);
            let severity = null;
            if (randomHealth.name !== "идеально здоров") {
                const healthOptions = ["ремиссия", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];
                severity = healthOptions[Math.floor(Math.random() * healthOptions.length)]
            }

            // Создаём запись для PlayerStats
            const newStat = await PlayerStats.create({
                fobia: randomFobia.name,
                character: randomCharacter.name,
                health: randomHealth.name,
                hobby: `${randomHobby.name} (${hobbyExperience} лет опыта)`,
                profession: `${randomProfession.name} (${professionExperience} лет опыта)`,
                age: randomAge,
                severity: severity,
            });

            return res.json(newStat);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при создании характеристик игрока' });
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
