const { Fobia_card } = require('../models/models');

class FobiaController {
    // Метод для создания фобий
    async create(req, res) {
        try {
            const { name } = req.body;

            // Если массив, используем bulkCreate
            if (Array.isArray(name)) {
                const fobiaItems = await Fobia_card.bulkCreate(
                    name.map(item => ({ name: item }))
                );
                return res.json(fobiaItems);
            }

            // Если одно значение, создаём одну запись
            const fobia = await Fobia_card.create({ name });
            return res.json(fobia);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при добавлении фобии" });
        }
    }

    // Метод для получения всех фобий
    async getAll(req, res) {
        try {
            const fobias = await Fobia_card.findAll(); // Получаем все записи
            return res.json(fobias);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при получении фобий" });
        }
    }

    // Метод для получения фобии по ID
    async getOne(req, res) {
        try {
            const { id } = req.params; // Получаем ID из параметров
            const fobia = await Fobia_card.findByPk(id); // Ищем запись по ID

            if (!fobia) {
                return res.status(404).json({ message: "Фобия не найдена" });
            }

            return res.json(fobia);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при получении фобии" });
        }
    }
}

module.exports = new FobiaController();
