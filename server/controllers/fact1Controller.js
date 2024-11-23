const { Fact1_card } = require('../models/models');

class Fact1Controller {
    async create(req, res) {
        try {
            const { name } = req.body;
            
            // Проверка, если name — это массив, добавляем сразу несколько
            if (Array.isArray(name)) {
                const fact1Items = await Fact1_card.bulkCreate(
                    name.map(item => ({ name: item }))
                );
                return res.json(fact1Items);
            }

            // Если name — не массив, добавляем один предмет
            const fact1 = await Fact1_card.create({ name });
            return res.json(fact1);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при добавлении факта" });
        }
        
    }
}

module.exports = new Fact1Controller();
