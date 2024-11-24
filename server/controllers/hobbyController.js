const { Hobby_card } = require('../models/models');

class HobbyController {
    async create(req, res) {
        try {
            const { name } = req.body;
            
            // Проверка, если name — это массив, добавляем сразу несколько
            if (Array.isArray(name)) {
                const hobbyItems = await Hobby_card.bulkCreate(
                    name.map(item => ({ name: item }))
                );
                return res.json(hobbyItems);
            }

            // Если name — не массив, добавляем один предмет
            const hobby = await Hobby_card.create({ name });
            return res.json(hobby);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при добавлении факта" });
        }
        
    }
}

module.exports = new HobbyController();
