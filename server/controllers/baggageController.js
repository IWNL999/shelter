const { Baggage_card } = require('../models/models');

class BaggageController {
    async create(req, res) {
        try {
            const { name } = req.body;
            
            // Проверка, если name — это массив, добавляем сразу несколько
            if (Array.isArray(name)) {
                const baggageItems = await Baggage_card.bulkCreate(
                    name.map(item => ({ name: item }))
                );
                return res.json(baggageItems);
            }

            // Если name — не массив, добавляем один предмет
            const baggage = await Baggage_card.create({ name });
            return res.json(baggage);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при добавлении багажа" });
        }
    }
}

module.exports = new BaggageController();
