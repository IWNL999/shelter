const { Fact2_card } = require('../models/models');

class Fact2Controller {
    async create(req, res) {
        try {
            const { name } = req.body;
            
            // Проверка, если name — это массив, добавляем сразу несколько
            if (Array.isArray(name)) {
                const fact2Items = await Fact2_card.bulkCreate(
                    name.map(item => ({ name: item }))
                );
                return res.json(fact2Items);
            }

            // Если name — не массив, добавляем один предмет
            const fact2 = await Fact2_card.create({ name });
            return res.json(fact2);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при добавлении факта" });
        }
        
    }
}

module.exports = new Fact2Controller();
