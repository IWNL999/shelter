const { Character_card } = require('../models/models');

class CharacterController {
    async create(req, res) {
        try {
            const { name } = req.body;
            
            // Проверка, если name — это массив, добавляем сразу несколько
            if (Array.isArray(name)) {
                const characterItems = await Character_card.bulkCreate(
                    name.map(item => ({ name: item }))
                );
                return res.json(characterItems);
            }

            // Если name — не массив, добавляем один предмет
            const character = await Character_card.create({ name });
            return res.json(character);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при добавлении характера" });
        }
        
    }
}

module.exports = new CharacterController();
