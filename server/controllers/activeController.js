const { Active_card } = require('../models/models');

class ActiveController {
    async create(req, res) {
        try {
            const { items } = req.body; // Извлекаем массив строк из тела запроса

            if (!Array.isArray(items)) {
                return res.status(400).json({ message: "'items' должен быть массивом строк" });
            }

            // Преобразуем строки в объекты с полями name, text и usage
            const parsedItems = items.map((item) => {
                const [name, text, usage] = item.split(',').map(part => part.trim()); // Разделяем строку на части

                if (!name) {
                    throw new Error("Название (name) обязательно для каждой карточки.");
                }

                return {
                    name,
                    text: text || null, // Если текст пустой, устанавливаем null
                    usage: usage || null, // Если usage пустой, устанавливаем null
                };
            });

            // Добавляем карточки в базу данных
            const activeItems = await Active_card.bulkCreate(parsedItems, {
                returning: ['id', 'name', 'text', 'usage', 'createdAt', 'updatedAt'], // Указываем существующие поля
            });

            return res.json(activeItems); // Возвращаем созданные карточки
        } catch (error) {
            console.error(error);

            // Проверяем, ошибка это или просто плохой запрос
            const statusCode = error.message.includes("Название (name)") ? 400 : 500;
            return res.status(statusCode).json({ message: error.message || "Ошибка при добавлении карты действия" });
        }
    }
}

module.exports = new ActiveController();
